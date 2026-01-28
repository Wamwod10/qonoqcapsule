import React, { useEffect } from "react";
import "./paymentsuccess.scss";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

await fetch("https://qonoqcapsule-backend.onrender.com/notify/email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ booking }),
});
const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sendBookingToTelegram = async () => {
      try {
        const booking = JSON.parse(localStorage.getItem("lastBooking"));

        if (!booking) return;

        await fetch(
          "https://qonoqcapsule-backend.onrender.com/notify/booking",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ booking }),
          },
        );

        console.log("Booking sent to Telegram ✅");
      } catch (err) {
        console.log("Telegram send error:", err);
      }
    };

    sendBookingToTelegram();
  }, []);

  return (
    <div className="qonoq-success">
      <div className="qonoq-success__card">
        <FaCheck className="qonoq-success__icon" />

        <h1>Payment Successful</h1>
        <p>Your booking has been confirmed successfully</p>

        <div className="qonoq-success__line" />

        <div className="qonoq-success__info">
          <div>
            <span>Status</span>
            <strong>Confirmed</strong>
          </div>
          <div>
            <span>Hotel</span>
            <strong>Qonoq Capsule</strong>
          </div>
        </div>

        <div className="qonoq-success__buttons">
          <button onClick={() => navigate("/")}>Home</button>
          <button className="outline" onClick={() => navigate("/booking")}>
            New Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
