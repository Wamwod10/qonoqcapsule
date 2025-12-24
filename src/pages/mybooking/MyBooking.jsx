import React, { useEffect, useState } from "react";
import BookingCard from "./components/Bookingcard/BookingCard";
import "./mybooking.scss";
import { useTranslation } from "react-i18next";

const MyBooking = () => {
  const { t } = useTranslation();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("my_bookings")) || [];
    setBookings(data);
  }, []);

  const deleteBooking = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("my_bookings", JSON.stringify(updated));
  };

  return (
    <div className="mybooking">
      <div className="container">
        <h1>{t("mybooking_title")}</h1>

        {bookings.length === 0 ? (
          <p>{t("mybooking_empty")}</p>
        ) : (
          bookings.map((b) => (
            <BookingCard key={b.id} booking={b} onDelete={deleteBooking} />
          ))
        )}
      </div>
    </div>
  );
};

export default MyBooking;
