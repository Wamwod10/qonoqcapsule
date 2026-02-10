import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import crypto from "crypto";
import axios from "axios";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

/* ================= APP ================= */

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["https://qonoqcapsule.uz", "http://localhost:5173"],
  }),
);
app.use(express.json());

/* ================= PATH FIX (ES MODULE) ================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= DB (POSTGRESQL) ================= */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      branch TEXT,
      "capsuleType" TEXT,
      date TEXT,
      time TEXT,
      duration INTEGER,
      "createdAt" TEXT
    )
  `);
  console.log("✅ PostgreSQL connected & table ready");
}

initDB().catch((err) => {
  console.error("DB INIT ERROR:", err);
  process.exit(1);
});

/* ================= TEST ================= */

app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

/* ================= EMAIL TRANSPORTER ================= */

const mailTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ================= HELPERS ================= */

function toDateTime(date, time) {
  return new Date(`${date}T${time}:00`);
}

async function checkAvailability({
  branch,
  capsuleType,
  date,
  time,
  duration,
}) {
  const limit = capsuleType === "family" ? 2 : 4;

  const reqStart = toDateTime(date, time);
  const reqEnd = new Date(
    reqStart.getTime() + Number(duration) * 60 * 60 * 1000,
  );

  const result = await pool.query(
    `SELECT
       id,
       branch,
       "capsuleType" AS "capsuleType",
       date,
       time,
       duration,
       "createdAt" AS "createdAt"
     FROM bookings
     WHERE branch=$1 AND "capsuleType"=$2`,
    [branch, capsuleType],
  );

  const rows = result.rows;

  const overlaps = rows.filter((b) => {
    const bStart = toDateTime(b.date, b.time);
    const bEnd = new Date(
      bStart.getTime() + Number(b.duration) * 60 * 60 * 1000,
    );
    return reqStart < bEnd && reqEnd > bStart;
  });

  if (overlaps.length < limit) {
    return { available: true };
  }

  const nextFreeDate = new Date(
    Math.min(
      ...overlaps.map((b) => {
        const s = toDateTime(b.date, b.time);
        return s.getTime() + Number(b.duration) * 60 * 60 * 1000;
      }),
    ),
  );

  const hh = String(nextFreeDate.getHours()).padStart(2, "0");
  const mm = String(nextFreeDate.getMinutes()).padStart(2, "0");

  const nextDay = nextFreeDate.toDateString() !== reqStart.toDateString();

  return {
    available: false,
    nextTime: `${hh}:${mm}`,
    nextDay,
  };
}

/* ================= BOOKINGS ================= */

app.get("/api/bookings", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        branch,
        "capsuleType" AS "capsuleType",
        date,
        time,
        duration,
        "createdAt" AS "createdAt"
      FROM bookings
      ORDER BY date, time
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("DB GET ERROR:", err);
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/api/bookings", async (req, res) => {
  const { branch, capsuleType, date, time, duration } = req.body;

  if (!branch || !capsuleType || !date || !time || !duration) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const avail = await checkAvailability({
      branch,
      capsuleType,
      date,
      time,
      duration,
    });

    if (!avail.available) {
      return res.status(409).json({
        error: "No availability",
        nextTime: avail.nextTime,
        nextDay: avail.nextDay,
      });
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await pool.query(
      `INSERT INTO bookings (id, branch, "capsuleType", date, time, duration, "createdAt")
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [id, branch, capsuleType, date, time, Number(duration), createdAt],
    );

    res.json({
      success: true,
      booking: { id, branch, capsuleType, date, time, duration, createdAt },
    });
  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM bookings WHERE id = $1`, [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("DB DELETE ERROR:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

/* ================= AVAILABILITY ================= */

app.post("/api/check-availability", async (req, res) => {
  const { branch, capsuleType, date, time, duration } = req.body;

  if (!branch || !capsuleType || !date || !time || !duration) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const result = await checkAvailability({
      branch,
      capsuleType,
      date,
      time,
      duration,
    });
    res.json(result);
  } catch (err) {
    console.error("AVAIL DB ERROR:", err);
    res.status(500).json({ error: "DB error" });
  }
});

/* ================= OCTO PAYMENT ================= */

app.post("/api/create-payment", async (req, res) => {
  try {
    const { amount, bookings } = req.body;

    if (!amount || !bookings || !bookings.length) {
      return res.status(400).json({ error: "Amount & bookings required" });
    }

    const orderId = crypto.randomUUID();

    const payload = {
      octo_shop_id: Number(process.env.OCTO_SHOP_ID),
      octo_secret: process.env.OCTO_SECRET,
      shop_transaction_id: orderId,
      auto_capture: true,
      test: true,
      init_time: new Date().toISOString().slice(0, 19).replace("T", " "),
      total_sum: Number(amount),
      currency: "UZS",
      description: "Qonoq Capsule Booking",
      basket: bookings.map((b) => ({
        position_desc: `${b.capsuleTypeValue} | ${b.checkIn} ${b.checkInTime}`,
        count: 1,
        price: Number(b.price),
      })),
      payment_methods: [
        { method: "bank_card" },
        { method: "uzcard" },
        { method: "humo" },
      ],
      return_url: "https://qonoqcapsule.uz/success",
      notify_url: "https://qonoqcapsule-backend.onrender.com/api/octo-callback",
      language: "uz",
      ttl: 15,
    };

    const response = await axios.post(
      "https://secure.octo.uz/prepare_payment",
      payload,
      { headers: { "Content-Type": "application/json" } },
    );

    const data = response.data;

    if (data.error !== 0) {
      console.error("OCTO ERROR:", data);
      return res.status(500).json({ error: data.errMessage || "Octo error" });
    }

    res.json({
      paymentUrl: data.data.octo_pay_url,
      octoPaymentId: data.data.octo_payment_UUID,
      orderId,
    });
  } catch (err) {
    console.error("OCTO PAY ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Payment create failed" });
  }
});

app.post("/api/octo-callback", (req, res) => {
  console.log("✅ OCTO CALLBACK:", req.body);
  res.json({ status: "ok" });
});

/* ================= TELEGRAM CONTACT BOT ================= */

app.post("/notify/telegram", async (req, res) => {
  try {
    const { text } = req.body;

    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(
      "TELEGRAM CONTACT ERROR:",
      error.response?.data || error.message,
    );
    res.status(500).json({ success: false });
  }
});

/* ================= TELEGRAM BOOKING BOT ================= */

app.post("/notify/booking", async (req, res) => {
  try {
    const { booking } = req.body;

    const text = `📢 Yangi bron qabul qilindi

👤 Ism: ${booking.name}
📧 Email: ${booking.email}
📞 Telefon: ${booking.phone}

🗓️ Bron vaqti: ${booking.bookedAt}
📅 Kirish sanasi: ${booking.checkInDate}
⏰ Kirish vaqti: ${booking.checkInTime}
🛏️ Xona: ${booking.room}
📆 Davomiylik: ${booking.duration}
💶 Narx: ${booking.price}

❕ @freemustafa Send an Invoice to the guest!
✅ Mijoz kelganda, mavjud bo‘lgan ixtiyoriy bo‘sh kapsulaga joylashtiriladi
🌐 Sayt: qonoqcapsule.uz`;

    const url = `https://api.telegram.org/bot${process.env.BOOKING_BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: process.env.BOOKING_CHAT_ID,
      text,
    });

    res.json({ success: true });
  } catch (err) {
    console.log("TELEGRAM BOOKING ERROR:", err.response?.data || err.message);
    res.status(500).json({ success: false });
  }
});

/* ================= EMAIL TO USER ================= */

app.post("/notify/email", async (req, res) => {
  try {
    const { booking } = req.body;

    if (!booking || !booking.email) {
      return res.status(400).json({ error: "Email not provided" });
    }

    const text = `
Bron tasdiqlandi ✅

Ism: ${booking.name}
Email: ${booking.email}
Telefon: ${booking.phone}

🗓️ Bron vaqti: ${booking.bookedAt}
📅 Kirish sanasi: ${booking.checkInDate}
⏰ Kirish vaqti: ${booking.checkInTime}
🛏️ Xona: ${booking.room}
📆 Davomiylik: ${booking.duration}
💶 Narx: ${booking.price}

❕ @freemustafa Send an Invoice to the guest!
✅ Mijoz kelganda, mavjud bo‘lgan ixtiyoriy bo‘sh kapsulaga joylashtiriladi
🌐 Sayt: qonoqcapsule.uz`;

    await mailTransporter.sendMail({
      from: `"Qonoq Capsule" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "Bron tasdiqlandi",
      text,
    });

    res.json({ success: true });
  } catch (err) {
    console.log("EMAIL ERROR:", err);
    res.status(500).json({ success: false });
  }
});

/* ================= START ================= */

app.listen(PORT, () => {
  console.log("🚀 Server running good on port", PORT);
});
