import React, { useEffect, useState } from "react";
import BookingCard from "./components/Bookingcard/BookingCard";
import "./mybooking.scss";
import { useTranslation } from "react-i18next";
import { TbMoodEmpty } from "react-icons/tb";
import axios from "axios";

const API = "https://qonoqcapsule-backend.onrender.com";
// const API = "http://localhost:5000";

const MyBooking = () => {
  const { t } = useTranslation();

  const [bookings, setBookings] = useState([]);
  const [currency, setCurrency] = useState("UZS");
  const [checking, setChecking] = useState(false);
  const [paying, setPaying] = useState(false);
  const [busyInfo, setBusyInfo] = useState(null);

  /* ===== LOAD BOOKINGS ===== */

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("my_bookings")) || [];
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("LOCALSTORAGE READ ERROR:", err);
      setBookings([]);
    }
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
  const RUB_RATE = 160;

  let displayTotal = totalUZS;

  if (currency === "USD") displayTotal = (totalUZS / USD_RATE).toFixed(1);
  if (currency === "EUR") displayTotal = (totalUZS / EUR_RATE).toFixed(1);
  if (currency === "RUB") displayTotal = (totalUZS / RUB_RATE).toFixed(1);

  /* ===== HELPERS ===== */

  const durationMap = {
    "2h": 2,
    "4h": 4,
    "6h": 6,
    "10h": 10,
    "1d": 24,
  };

  const getBranch = (booking) => {
    if (booking.locationValue === "tas") return "airport";
    if (booking.locationValue === "buh") return "city";
    if (booking.locationValue === "sam") return "north";
    return booking.locationValue || "airport";
  };

  const normalizeBookingsForBackend = () => {
    return bookings.map((b) => ({
      ...b,
      branch: getBranch(b),
      capsuleType: b.capsuleTypeValue,
      date: b.checkIn,
      time: b.checkInTime,
      duration: durationMap[b.durationValue] || Number(b.duration) || 0,
    }));
  };

  /* ===== AVAILABILITY CHECK ===== */

  const checkAllAvailability = async () => {
    setChecking(true);

    try {
      for (const b of bookings) {
        const branch = getBranch(b);

        const res = await fetch(`${API}/api/check-availability`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            branch,
            capsuleType: b.capsuleTypeValue,
            date: b.checkIn,
            time: b.checkInTime,
            duration: durationMap[b.durationValue] || Number(b.duration) || 0,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Availability request failed");
        }

        if (!data.available) {
          setBusyInfo({
            id: b.id,
            nextTime: data.nextTime,
            nextDay: data.nextDay,
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
    if (paying || checking) return;

    const ok = await checkAllAvailability();
    if (!ok) return;

    try {
      setPaying(true);

      const firstBooking = bookings[0] || {};
      const preparedBookings = normalizeBookingsForBackend();

      const res = await axios.post(`${API}/api/create-payment`, {
        amount: totalUZS,
        bookings: preparedBookings,
        phone: firstBooking.phone || "",
        email: firstBooking.email || "",
        name: firstBooking.name || "",
      });

      const { paymentUrl } = res.data;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert("Payment link not received");
      }
    } catch (err) {
      console.error("PAYMENT ERROR:", err.response?.data || err.message);

      if (err.response?.status === 409) {
        const data = err.response.data;

        setBusyInfo({
          id: data?.item?.id || null,
          nextTime: data?.nextTime || "Unknown",
          nextDay: data?.nextDay || false,
        });
      } else {
        alert("Payment error. Try again.");
      }
    } finally {
      setPaying(false);
    }
  };

  /* ===== UI ===== */

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
                  <button
                    type="button"
                    onClick={() => setCurrency("UZS")}
                    disabled={checking || paying}
                  >
                    UZS
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    disabled={checking || paying}
                  >
                    USD
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("EUR")}
                    disabled={checking || paying}
                  >
                    EUR
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("RUB")}
                    disabled={checking || paying}
                  >
                    RUB
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                className="mybooking__button"
                disabled={checking || paying}
              >
                {checking
                  ? "Checking availability..."
                  : paying
                    ? "Redirecting to payment..."
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
              {busyInfo.nextDay ? " (next day)" : ""}
            </p>

            <button type="button" onClick={() => setBusyInfo(null)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
