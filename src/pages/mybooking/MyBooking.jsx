import React, { useEffect, useState } from "react";
import BookingCard from "./components/Bookingcard/BookingCard";
import "./mybooking.scss";
import { useTranslation } from "react-i18next";
import { TbMoodEmpty } from "react-icons/tb";
import axios from "axios";

const MyBooking = () => {
  const { t } = useTranslation();

  const [bookings, setBookings] = useState([]);
  const [currency, setCurrency] = useState("UZS");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("my_bookings")) || [];
    setBookings(data);
  }, []);

  const deleteBooking = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("my_bookings", JSON.stringify(updated));
  };

  // ===== TOTAL (always in UZS for payment) =====
  const totalUZS = bookings.reduce((sum, b) => sum + Number(b.price), 0);

  // ===== DISPLAY CURRENCY (only UI) =====
  const USD_RATE = 12000;
  const EUR_RATE = 14000;

  let displayTotal = totalUZS;

  if (currency === "USD") displayTotal = (totalUZS / USD_RATE).toFixed(1);
  if (currency === "EUR") displayTotal = (totalUZS / EUR_RATE).toFixed(1);

  // ===== OCTO PAYMENT =====
  const handlePayment = async () => {
    try {
      const res = await axios.post("http://localhost:5000/create-payment", {
        amount: totalUZS, // ⚠️ Octo ga faqat UZS yuboramiz
      });

      const { paymentUrl } = res.data;

      if (paymentUrl) {
        window.location.href = paymentUrl; // 👉 Octo sahifaga o‘tadi
      } else {
        alert("Payment link not received");
      }
    } catch (err) {
      console.error("PAYMENT ERROR:", err);
      alert("Payment error. Try again.");
    }
  };

  return (
    <div className="mybooking">
      <div className="container">
        <h1 className="mybooking__title">{t("mybooking_title")}</h1>

        {bookings.length === 0 ? (
          <>
            <div className="mybooking__icon-wrap">
              <TbMoodEmpty className="mybooking__icon" />
            </div>
            <p>{t("mybooking_empty")}</p>
            <a href="/" className="qonoq__big-link mybooking__book-div">
              {t("service_header_booking")}
            </a>
          </>
        ) : (
          <>
            <a
              href="/"
              className="qonoq__big-link mybooking__book-div mybooking__extra"
            >
              Add a Booking +
            </a>

            {bookings.map((b) => (
              <BookingCard key={b.id} booking={b} onDelete={deleteBooking} />
            ))}

            <div className="mybooking__button-div">
              {/* ===== TOTAL ===== */}
              <div className="mybooking__value">
                <h2 className="mybooking__total">
                  Total: {Number(displayTotal).toLocaleString()} {currency}
                </h2>

                {/* ===== CURRENCY SWITCH ===== */}
                <div className="mybooking__currency-switch">
                  <button onClick={() => setCurrency("UZS")}>UZS</button>
                  <button onClick={() => setCurrency("USD")}>USD</button>
                  <button onClick={() => setCurrency("EUR")}>EUR</button>
                </div>
              </div>

              {/* ===== PAYMENT BUTTON ===== */}
              <button onClick={handlePayment} className="mybooking__button">
                Complete Your Purchase
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
