import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./capsmodal.scss";
import { useTranslation } from "react-i18next";

const PRICE_MAP = {
  standard: {
    "4h": 400000,
    "6h": 600000,
    "10h": 800000,
  },
  family: {
    "4h": 600000,
    "6h": 800000,
    "10h": 1000000,
  },
};

const CapsModal = ({ onClose }) => {
  const { t } = useTranslation();
  const [closing, setClosing] = useState(false);

  const bookingBase = JSON.parse(
    sessionStorage.getItem("qonoq_booking") || "{}"
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const capsuleType = bookingBase.capsuleTypeValue || "standard";
  const duration = bookingBase.durationValue || "4h";

  const price = PRICE_MAP[capsuleType]?.[duration] || 0;

  const closeModal = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && closeModal();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleConfirm = () => {
    const newBooking = {
      id: crypto.randomUUID(),
      ...bookingBase,
      ...form,
      price,
      createdAt: new Date().toISOString(),
    };

    const old = JSON.parse(localStorage.getItem("my_bookings")) || [];

    localStorage.setItem("my_bookings", JSON.stringify([...old, newBooking]));

    closeModal();
  };

  return createPortal(
    <div
      className={`capsmodal ${closing ? "closing" : ""}`}
      onClick={closeModal}
    >
      <div
        className={`capsmodal__box ${closing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="capsmodal__title">{t("capsmodal_title")}</h2>

        <div className="capsmodal__form">
          {["firstName", "lastName", "phone", "email"].map((key) => (
            <div className="input-group" key={key}>
              <input
                required
                type={key === "email" ? "email" : "text"}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
              <label>
                {key === "firstName"
                  ? t("capsmodal_first_name")
                  : key === "lastName"
                  ? t("capsmodal_last_name")
                  : key === "phone"
                  ? t("capsmodal_phone")
                  : t("capsmodal_email")}
              </label>
            </div>
          ))}
        </div>

        <div className="capsmodal__price">
          {t("capsmodal_price")} <span>{price.toLocaleString()} UZS</span>
        </div>

        <div className="capsmodal__actions">
          <button className="btn confirm" onClick={handleConfirm}>
            {t("capsmodal_confirm")}
          </button>
          <button className="btn cancel" onClick={closeModal}>
            {t("capsmodal_cancel")}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CapsModal;
