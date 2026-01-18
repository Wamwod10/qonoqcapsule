const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// ================= CREATE PAYMENT =================
app.post("/create-payment", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    // ⚠️ Octo API endpoint keyin aniq qilamiz
    const response = await axios.post(
      "https://api.octo.uz/payment/create",
      {
        shop_id: process.env.OCTO_SHOP_ID,
        amount: amount,
        currency: "UZS",
        description: "Qonoq Capsule Booking",
        return_url: "http://localhost:5173/mybooking",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OCTO_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentUrl = response.data?.payment_url;

    res.json({ paymentUrl });
  } catch (err) {
    console.error("OCTO ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Payment create failed" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
