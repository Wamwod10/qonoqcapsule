import React, { useEffect, useState } from "react";
import BookingCard from "./components/Bookingcard/BookingCard";
import "./mybooking.scss";
import { useTranslation } from "react-i18next";
import { TbMoodEmpty } from "react-icons/tb";

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
              <a href="#!" className="mybooking__button">
                Complete Your Purchase
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
