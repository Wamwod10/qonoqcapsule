import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/notify/telegram", async (req, res) => {
  try {
    const { text } = req.body;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const tgRes = await axios.post(url, {
      chat_id: CHAT_ID,
      text: text,
    });

    console.log("Telegram sent:", tgRes.data);

    res.json({ success: true });
  } catch (error) {
    console.log("Telegram ERROR:", error.response?.data || error.message);
    res.status(500).json({ success: false });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running http://localhost:5000");
});

app.post("/notify/booking", async (req, res) => {
  try {
    const { booking } = req.body;

    const text = `📢 Yangi bron qabul qilindi

👤 Ism: ${booking.name}
📧 Email: ${booking.email}
📞 Telefon: ${booking.phone}

🗓 Kirish: ${booking.checkIn}
⏰ Chiqish: ${booking.checkOut}
🛏 Xona: ${booking.room}
💶 Narx: ${booking.price}`;

    const url = `https://api.telegram.org/bot${process.env.BOOKING_BOT_TOKEN}/sendMessage`;

    await axios.post(url, {
      chat_id: process.env.BOOKING_CHAT_ID,
      text,
    });

    res.json({ success: true });
  } catch (err) {
    console.log("BOOKING BOT ERROR:", err.response?.data || err.message);
    res.status(500).json({ success: false });
  }
});
