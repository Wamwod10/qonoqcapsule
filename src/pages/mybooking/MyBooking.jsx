import React, { useEffect, useState } from "react";
import BookingCard from "./components/Bookingcard/BookingCard";
import "./mybooking.scss";
import { useTranslation } from "react-i18next";
import { TbMoodEmpty } from "react-icons/tb";
import axios from "axios";

const API = "https://qonoqcapsule-backend.onrender.com";
// const API = "http://localhost:5000"; // local test

const MyBooking = () => {
  const { t } = useTranslation();

  const [bookings, setBookings] = useState([]);
  const [currency, setCurrency] = useState("UZS");
  const [checking, setChecking] = useState(false);
  const [busyInfo, setBusyInfo] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("my_bookings")) || [];
    setBookings(data);
  }, []);

  const deleteBooking = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("my_bookings", JSON.stringify(updated));
  };

  /* ===== TOTAL ===== */

  const totalUZS = bookings.reduce((sum, b) => sum + Number(b.price || 0), 0);

  const USD_RATE = 12000;
  const EUR_RATE = 14000;

  let displayTotal = totalUZS;

  if (currency === "USD") displayTotal = (totalUZS / USD_RATE).toFixed(1);
  if (currency === "EUR") displayTotal = (totalUZS / EUR_RATE).toFixed(1);

  /* ===== AVAILABILITY CHECK ===== */

  const durationMap = { "4h": 4, "6h": 6, "10h": 10 };

  const checkAllAvailability = async () => {
    setChecking(true);

    try {
      for (const b of bookings) {
        const branch =
          b.locationValue === "tas"
            ? "airport"
            : b.locationValue === "buh"
            ? "city"
            : "north";

        const res = await fetch(`${API}/api/check-availability`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            branch,
            capsuleType: b.capsuleTypeValue,
            date: b.checkIn,
            time: b.checkInTime,
            duration: durationMap[b.durationValue],
          }),
        });

        const data = await res.json();

        if (!data.available) {
          setBusyInfo({
            id: b.id,
            nextTime: data.nextTime,
          });
          setChecking(false);
          return false;
        }
      }

      setChecking(false);
      return true;
    } catch (err) {
      console.error("AVAILABILITY CHECK ERROR:", err);
      setChecking(false);
      alert("Availability check failed. Try again.");
      return false;
    }
  };

  /* ===== OCTO PAYMENT ===== */

  const handlePayment = async () => {
    if (bookings.length === 0) return;

    const ok = await checkAllAvailability();
    if (!ok) return;

    try {
      const res = await axios.post(`${API}/api/create-payment`, {
        amount: totalUZS,
        bookings: bookings,
      });

      const { paymentUrl } = res.data;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert("Payment link not received");
      }
    } catch (err) {
      console.error("PAYMENT ERROR:", err.response?.data || err.message);
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
              <div className="mybooking__value">
                <h2 className="mybooking__total">
                  Total: {Number(displayTotal).toLocaleString()} {currency}
                </h2>

                <div className="mybooking__currency-switch">
                  <button onClick={() => setCurrency("UZS")}>UZS</button>
                  <button onClick={() => setCurrency("USD")}>USD</button>
                  <button onClick={() => setCurrency("EUR")}>EUR</button>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="mybooking__button"
                disabled={checking}
              >
                {checking
                  ? "Checking availability..."
                  : "Complete Your Purchase"}
              </button>
            </div>
          </>
        )}
      </div>

      {busyInfo && (
        <div className="availability-modal">
          <div className="availability-modal__box">
            <p>
              This room is busy. Next available time: <b>{busyInfo.nextTime}</b>
            </p>
            <button onClick={() => setBusyInfo(null)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
