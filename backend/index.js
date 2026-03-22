import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";
import axios from "axios";
import { fileURLToPath } from "url";
import path from "path";
import nodemailer from "nodemailer";
import pkg from "pg";

dotenv.config();

const { Pool } = pkg;

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= MIDDLEWARE ================= */

const allowedOrigins = [
  "https://qonoqcapsule.uz",
  "https://www.qonoqcapsule.uz",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_WWW,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  }),
);

app.use(express.json());

/* ================= PATH ================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= DATABASE ================= */

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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS pending_payments (
      id TEXT PRIMARY KEY,
      "octoPaymentId" TEXT,
      amount NUMERIC,
      phone TEXT,
      email TEXT,
      name TEXT,
      bookings JSONB,
      status TEXT DEFAULT 'created',
      "createdAt" TEXT,
      "updatedAt" TEXT,
      "rawCallback" JSONB
    )
  `);

  console.log("✅ PostgreSQL connected");
}

initDB().catch((err) => {
  console.error("DB INIT ERROR:", err);
  process.exit(1);
});

/* ================= TEST ================= */

app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

/* ================= EMAIL ================= */

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

function normalizeBookingItem(item = {}) {
  return {
    branch: item.branch || item.locationLabel || "",
    capsuleType: item.capsuleType || item.room || "",
    date: item.date || item.checkInDate || "",
    time: item.time || item.checkInTime || "",
    duration: Number(item.duration) || 0,
  };
}

function isSuccessStatus(status) {
  if (!status) return false;

  const value = String(status).toLowerCase();

  return [
    "succeeded",
    "success",
    "paid",
    "capture",
    "captured",
    "completed",
  ].includes(value);
}

function isFailedStatus(status) {
  if (!status) return false;

  const value = String(status).toLowerCase();

  return [
    "failed",
    "cancel",
    "cancelled",
    "canceled",
    "expired",
    "rejected",
  ].includes(value);
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
  const reqEnd = new Date(reqStart.getTime() + Number(duration) * 3600000);

  const result = await pool.query(
    `SELECT * FROM bookings WHERE branch=$1 AND "capsuleType"=$2`,
    [branch, capsuleType],
  );

  const overlaps = result.rows.filter((b) => {
    const bStart = toDateTime(b.date, b.time);
    const bEnd = new Date(bStart.getTime() + Number(b.duration) * 3600000);

    return reqStart < bEnd && reqEnd > bStart;
  });

  if (overlaps.length < limit) return { available: true };

  const nextFree = new Date(
    Math.min(
      ...overlaps.map((b) => {
        const s = toDateTime(b.date, b.time);
        return s.getTime() + Number(b.duration) * 3600000;
      }),
    ),
  );

  return {
    available: false,
    nextTime: nextFree.toTimeString().slice(0, 5),
    nextDay: nextFree.toDateString() !== reqStart.toDateString(),
  };
}

async function checkManyBookingsAvailability(bookings = []) {
  for (const rawItem of bookings) {
    const item = normalizeBookingItem(rawItem);

    if (
      !item.branch ||
      !item.capsuleType ||
      !item.date ||
      !item.time ||
      !item.duration
    ) {
      return {
        available: false,
        error: "Booking data is incomplete",
        item,
      };
    }

    const result = await checkAvailability(item);

    if (!result.available) {
      return {
        available: false,
        ...result,
        item,
      };
    }
  }

  return { available: true };
}

async function savePendingPayment({
  orderId,
  octoPaymentId = null,
  amount,
  phone = "",
  email = "",
  name = "",
  bookings = [],
  status = "created",
}) {
  const now = new Date().toISOString();

  await pool.query(
    `
      INSERT INTO pending_payments
      (id, "octoPaymentId", amount, phone, email, name, bookings, status, "createdAt", "updatedAt")
      VALUES ($1,$2,$3,$4,$5,$6,$7::jsonb,$8,$9,$10)
      ON CONFLICT (id)
      DO UPDATE SET
        "octoPaymentId" = EXCLUDED."octoPaymentId",
        amount = EXCLUDED.amount,
        phone = EXCLUDED.phone,
        email = EXCLUDED.email,
        name = EXCLUDED.name,
        bookings = EXCLUDED.bookings,
        status = EXCLUDED.status,
        "updatedAt" = EXCLUDED."updatedAt"
    `,
    [
      orderId,
      octoPaymentId,
      Number(amount),
      phone,
      email,
      name,
      JSON.stringify(bookings || []),
      status,
      now,
      now,
    ],
  );
}

async function updatePendingPaymentMeta({
  orderId,
  octoPaymentId = null,
  status = null,
  rawCallback = null,
}) {
  const now = new Date().toISOString();

  await pool.query(
    `
      UPDATE pending_payments
      SET
        "octoPaymentId" = COALESCE($2, "octoPaymentId"),
        status = COALESCE($3, status),
        "rawCallback" = COALESCE($4::jsonb, "rawCallback"),
        "updatedAt" = $5
      WHERE id = $1
    `,
    [
      orderId,
      octoPaymentId,
      status,
      rawCallback ? JSON.stringify(rawCallback) : null,
      now,
    ],
  );
}

async function finalizePayment(orderId, callbackPayload) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const paymentRes = await client.query(
      `SELECT * FROM pending_payments WHERE id=$1 FOR UPDATE`,
      [orderId],
    );

    if (paymentRes.rowCount === 0) {
      await client.query("ROLLBACK");
      return { ok: false, message: "Pending payment not found" };
    }

    const payment = paymentRes.rows[0];
    const currentStatus = payment.status || "";
    const callbackStatus =
      callbackPayload?.status ||
      callbackPayload?.payment_status ||
      callbackPayload?.transaction_status ||
      callbackPayload?.data?.status ||
      callbackPayload?.data?.payment_status ||
      callbackPayload?.data?.transaction_status ||
      "";

    const octoPaymentId =
      callbackPayload?.octo_payment_UUID ||
      callbackPayload?.octoPaymentId ||
      callbackPayload?.data?.octo_payment_UUID ||
      callbackPayload?.data?.octoPaymentId ||
      null;

    if (isSuccessStatus(currentStatus)) {
      await client.query(
        `
          UPDATE pending_payments
          SET
            "octoPaymentId" = COALESCE($2, "octoPaymentId"),
            "rawCallback" = $3::jsonb,
            "updatedAt" = $4
          WHERE id = $1
        `,
        [
          orderId,
          octoPaymentId,
          JSON.stringify(callbackPayload),
          new Date().toISOString(),
        ],
      );

      await client.query("COMMIT");
      return { ok: true, message: "Already finalized" };
    }

    if (!isSuccessStatus(callbackStatus)) {
      const nextStatus = isFailedStatus(callbackStatus)
        ? callbackStatus
        : callbackStatus || "pending";

      await client.query(
        `
          UPDATE pending_payments
          SET
            status = $2,
            "octoPaymentId" = COALESCE($3, "octoPaymentId"),
            "rawCallback" = $4::jsonb,
            "updatedAt" = $5
          WHERE id = $1
        `,
        [
          orderId,
          nextStatus,
          octoPaymentId,
          JSON.stringify(callbackPayload),
          new Date().toISOString(),
        ],
      );

      await client.query("COMMIT");
      return {
        ok: true,
        message: `Callback saved with non-final status: ${nextStatus}`,
      };
    }

    const bookings = Array.isArray(payment.bookings) ? payment.bookings : [];

    for (const rawItem of bookings) {
      const item = normalizeBookingItem(rawItem);

      const avail = await checkAvailability(item);

      if (!avail.available) {
        await client.query(
          `
            UPDATE pending_payments
            SET
              status = $2,
              "octoPaymentId" = COALESCE($3, "octoPaymentId"),
              "rawCallback" = $4::jsonb,
              "updatedAt" = $5
            WHERE id = $1
          `,
          [
            orderId,
            "paid_but_slot_unavailable",
            octoPaymentId,
            JSON.stringify(callbackPayload),
            new Date().toISOString(),
          ],
        );

        await client.query("COMMIT");

        return {
          ok: false,
          message: "Payment succeeded but selected slot is no longer available",
          item,
          avail,
        };
      }
    }

    for (const rawItem of bookings) {
      const item = normalizeBookingItem(rawItem);

      const bookingId = rawItem.id || crypto.randomUUID();
      const createdAt = new Date().toISOString();

      await client.query(
        `
          INSERT INTO bookings (id, branch, "capsuleType", date, time, duration, "createdAt")
          VALUES ($1,$2,$3,$4,$5,$6,$7)
          ON CONFLICT (id) DO NOTHING
        `,
        [
          bookingId,
          item.branch,
          item.capsuleType,
          item.date,
          item.time,
          item.duration,
          createdAt,
        ],
      );
    }

    await client.query(
      `
        UPDATE pending_payments
        SET
          status = $2,
          "octoPaymentId" = COALESCE($3, "octoPaymentId"),
          "rawCallback" = $4::jsonb,
          "updatedAt" = $5
        WHERE id = $1
      `,
      [
        orderId,
        callbackStatus || "succeeded",
        octoPaymentId,
        JSON.stringify(callbackPayload),
        new Date().toISOString(),
      ],
    );

    await client.query("COMMIT");

    return { ok: true, message: "Payment finalized and bookings created" };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

/* ================= AVAILABILITY ================= */

app.post("/api/check-availability", async (req, res) => {
  try {
    const { branch, capsuleType, date, time, duration } = req.body;

    const result = await checkAvailability({
      branch,
      capsuleType,
      date,
      time,
      duration,
    });

    res.json(result);
  } catch (err) {
    console.error("AVAILABILITY ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ================= BOOKINGS ================= */

app.get("/api/bookings", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM bookings ORDER BY date, time`,
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET BOOKINGS ERROR:", err);
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/api/bookings", async (req, res) => {
  const { branch, capsuleType, date, time, duration } = req.body;

  try {
    const avail = await checkAvailability({
      branch,
      capsuleType,
      date,
      time,
      duration,
    });

    if (!avail.available) {
      return res.status(409).json(avail);
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await pool.query(
      `INSERT INTO bookings (id, branch, "capsuleType", date, time, duration, "createdAt") VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [id, branch, capsuleType, date, time, duration, createdAt],
    );

    res.json({ success: true, id });
  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    await pool.query(`DELETE FROM bookings WHERE id=$1`, [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("DELETE BOOKING ERROR:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

/* ================= OCTO PAYMENT ================= */

app.post("/api/create-payment", async (req, res) => {
  try {
    const {
      amount,
      bookings = [],
      phone = "",
      email = "",
      name = "",
    } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!Array.isArray(bookings) || bookings.length === 0) {
      return res.status(400).json({ error: "Bookings are required" });
    }

    const availabilityCheck = await checkManyBookingsAvailability(bookings);

    if (!availabilityCheck.available) {
      return res.status(409).json(availabilityCheck);
    }

    const orderId = crypto.randomUUID();

    await savePendingPayment({
      orderId,
      amount,
      phone,
      email,
      name,
      bookings,
      status: "created",
    });

    const payload = {
      octo_shop_id: Number(process.env.OCTO_SHOP_ID),
      octo_secret: process.env.OCTO_SECRET,
      shop_transaction_id: orderId,
      auto_capture: true,
      test: String(process.env.OCTO_TEST_MODE || "false") === "true",
      init_time: new Date().toISOString().slice(0, 19).replace("T", " "),
      user_data:
        phone || email || name
          ? {
              user_id: name || phone || email || orderId,
              phone: String(phone || "").replace(/\D/g, ""),
              email: email || "",
            }
          : undefined,
      total_sum: Number(amount),
      currency: "UZS",
      description: "Qonoq Capsule Booking",
      return_url: `${process.env.FRONTEND_URL || "https://qonoqcapsule.uz"}/success?orderId=${orderId}`,
      notify_url:
        process.env.OCTO_NOTIFY_URL ||
        "https://qonoqcapsule-backend.onrender.com/api/octo-callback",
      language: "uz",
      ttl: 15,
    };

    const response = await axios.post(
      "https://secure.octo.uz/prepare_payment",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response.data;

    if (!data || Number(data.error) !== 0) {
      await updatePendingPaymentMeta({
        orderId,
        status: "prepare_failed",
        rawCallback: data || { error: "Unknown OCTO error" },
      });

      return res.status(500).json({
        error: "OCTO prepare_payment failed",
        details: data,
      });
    }

    const octoPaymentId = data?.data?.octo_payment_UUID || null;

    await updatePendingPaymentMeta({
      orderId,
      octoPaymentId,
      status: data?.data?.status || "waiting_payment",
      rawCallback: data,
    });

    res.json({
      paymentUrl: data.data.octo_pay_url,
      paymentId: octoPaymentId,
      orderId,
    });
  } catch (err) {
    console.error("OCTO ERROR:", err.response?.data || err.message);

    res.status(500).json({
      error: "Payment failed",
      details: err.response?.data || err.message,
    });
  }
});

/* ================= OCTO CALLBACK ================= */

app.post("/api/octo-callback", async (req, res) => {
  try {
    console.log("OCTO CALLBACK:", JSON.stringify(req.body, null, 2));

    const orderId =
      req.body?.shop_transaction_id ||
      req.body?.merchant_transaction_id ||
      req.body?.data?.shop_transaction_id ||
      req.body?.data?.merchant_transaction_id;

    if (!orderId) {
      return res.status(400).json({
        status: "error",
        message: "shop_transaction_id not found in callback",
      });
    }

    const result = await finalizePayment(orderId, req.body);

    if (!result.ok) {
      return res.status(200).json({
        status: "warning",
        message: result.message,
      });
    }

    return res.status(200).json({
      status: "ok",
      message: result.message,
    });
  } catch (err) {
    console.error("OCTO CALLBACK ERROR:", err);
    return res.status(500).json({
      status: "error",
      message: "Callback processing failed",
    });
  }
});

/* ================= PAYMENT STATUS ================= */

app.get("/api/payment-status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;

    const result = await pool.query(
      `SELECT id, "octoPaymentId", amount, phone, email, name, bookings, status, "createdAt", "updatedAt" FROM pending_payments WHERE id=$1`,
      [orderId],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PAYMENT STATUS ERROR:", err);
    res.status(500).json({ error: "DB error" });
  }
});

/* ================= TELEGRAM CONTACT ================= */

app.post("/notify/telegram", async (req, res) => {
  try {
    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      text: req.body.text,
    });

    res.json({ success: true });
  } catch (error) {
    console.log("TELEGRAM ERROR:", error.response?.data || error.message);
    res.status(500).json({ success: false });
  }
});

/* ================= TELEGRAM BOOKING ================= */

app.post("/notify/booking", async (req, res) => {
  try {
    const { booking } = req.body;

    let chatId = process.env.CHAT_ID;

    if (booking.locationLabel === "sam") {
      chatId = process.env.CHAT_ID_S;
    }

    const text = `📢 Yangi bron qabul qilindi

👤 Ism: ${booking.name}
📧 Email: ${booking.email}
📞 Telefon: ${booking.phone}

📍 Filial: ${booking.locationLabel}
🗓 Bron vaqti: ${booking.bookedAt}
📅 Kirish sanasi: ${booking.checkInDate}
⏰ Kirish vaqti: ${booking.checkInTime}
🛏 Xona: ${booking.room}
📆 Davomiylik: ${booking.duration}
💶 Narx: ${booking.price}

❕ @freemustafa Send an Invoice to the guest!
✅ Mijoz kelganda, mavjud bo‘lgan ixtiyoriy bo‘sh kapsulaga joylashtiriladi
🌐 Sayt: qonoqcapsule.uz`;

    const url = `https://api.telegram.org/bot${process.env.BOOKING_BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: chatId,
      text,
    });

    res.json({ success: true });
  } catch (err) {
    console.log("TELEGRAM BOOKING ERROR:", err.response?.data || err.message);
    res.status(500).json({ success: false });
  }
});

/* ================= EMAIL ================= */

app.post("/notify/email", async (req, res) => {
  try {
    const { booking } = req.body;

    await mailTransporter.sendMail({
      from: `"Qonoq Capsule" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "Bron tasdiqlandi",
      text: `Booking confirmed

${booking.checkInDate} ${booking.checkInTime}
${booking.duration}`,
    });

    res.json({ success: true });
  } catch (err) {
    console.log("EMAIL ERROR:", err.response?.data || err.message);
    res.status(500).json({ success: false });
  }
});

/* ================= START ================= */

app.listen(PORT, () => {
  console.log("🚀 Server running on", PORT);
});
