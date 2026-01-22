import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "./confirm.scss";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa";

const Confirm = ({ onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return createPortal(
    <div className="confirm" onClick={onClose}>
      <div className="confirm__box" onClick={(e) => e.stopPropagation()}>
        <div className="confirm__icon">
          <FaCheck />
        </div>

        <h2 className="confirm__title">
          {t("booking_accepted", { defaultValue: "Booking accepted" })}
        </h2>

        <p className="confirm__text">
          {t("go_to_mybooking", {
            defaultValue:
              "Go to the My Booking page to confirm your reservation",
          })}
        </p>

        <div className="confirm__actions">
          <button className="btn outline" onClick={onClose}>
            {t("stay_here", { defaultValue: "Stay Here" })}
          </button>

          <button className="btn fill" onClick={() => navigate("/my-booking")}>
            {t("my_booking", { defaultValue: "My Booking" })}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Confirm;
