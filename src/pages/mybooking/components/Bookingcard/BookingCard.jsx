import React, { useEffect } from "react";
import "./bookingcard.scss";
import { useTranslation } from "react-i18next";

const BookingCard = ({ booking, onDelete }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (!booking) return;

    const bookingData = {
      name: `${booking.firstName} ${booking.lastName}`,
      email: booking.email,
      phone: booking.phone,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut || "",
      room: booking.capsuleTypeLabel,
      price: booking.price,
    };

    localStorage.setItem("lastBooking", JSON.stringify(bookingData));
  }, [booking]);

  return (
    <div className="booking-card">
      <h3>{booking.locationLabel || t("booking_location_default")}</h3>

      <div className="row">
        <span>{t("booking_checkin")}:</span> {booking.checkIn}
      </div>

      <div className="row">
        <span>{t("booking_time")}:</span> {booking.checkInTime}
      </div>

      <div className="row">
        <span>{t("booking_capsule")}:</span> {booking.capsuleTypeLabel}
      </div>

      <div className="row">
        <span>{t("booking_duration")}:</span> {booking.durationLabel}
      </div>

      <div className="row">
        <span>{t("booking_price")}:</span> {booking.price.toLocaleString()} UZS
      </div>

      <h4>{t("booking_guest_info")}</h4>

      <div className="row">
        <span>{t("booking_name")}:</span> {booking.firstName} {booking.lastName}
      </div>

      <div className="row">
        <span>{t("booking_phone")}:</span> {booking.phone}
      </div>

      <div className="row">
        <span>{t("booking_email")}:</span> {booking.email}
      </div>

      <div className="actions">
        <button className="edit">{t("booking_edit")}</button>
        <button className="delete" onClick={() => onDelete(booking.id)}>
          {t("booking_delete")}
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
