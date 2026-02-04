import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./capsmodal.scss";
import { useTranslation } from "react-i18next";
import Confirm from "../capstype/Confirm";

const PRICE_MAP = {
  standard: {
    "2h": 345000,
    "4h": 460000,
    "6h": 690000,
    "10h": 920000,
    "1d": 1500000,
  },
  family: {
    "2h": 460000,
    "4h": 690000,
    "6h": 920000,
    "10h": 1150000,
    "1d": 1750000,
  },
};

const CapsModal = ({ onClose }) => {
  const { t } = useTranslation();

  const [closing, setClosing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const bookingBase = JSON.parse(
    sessionStorage.getItem("qonoq_booking") || "{}",
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

  // ❗ hammasini yopish (Confirm oynadan ham)
  const closeAll = () => {
    setClosing(true);
    setTimeout(() => {
      setShowConfirm(false);
      onClose();
    }, 300);
  };

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && closeAll();
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleConfirm = () => {
    if (!form.firstName || !form.lastName || !form.phone || !form.email) return;

    const newBooking = {
      id: crypto.randomUUID(),
      ...bookingBase,
      ...form,
      price,
      createdAt: new Date().toISOString(),
    };

    const old = JSON.parse(localStorage.getItem("my_bookings")) || [];
    localStorage.setItem("my_bookings", JSON.stringify([...old, newBooking]));

    // ✅ CapsModal yopiladi, faqat Confirm chiqadi
    setShowConfirm(true);
  };

  return createPortal(
    <>
      {/* ===== BOOKING FORM MODAL (faqat showConfirm false bo‘lsa) ===== */}
      {!showConfirm && (
        <div
          className={`capsmodal ${closing ? "closing" : ""}`}
          onClick={closeAll}
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
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
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
              <button className="btn btn-confirm" onClick={handleConfirm}>
                {t("capsmodal_confirm")}
              </button>
              <button className="btn cancel" onClick={closeAll}>
                {t("capsmodal_cancel")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== SUCCESS CONFIRM MODAL (faqat showConfirm true bo‘lsa) ===== */}
      {showConfirm && <Confirm onClose={closeAll} />}
    </>,
    document.body,
  );
};

export default CapsModal;
