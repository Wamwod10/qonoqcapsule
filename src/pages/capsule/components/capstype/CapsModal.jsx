import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./capsmodal.scss";

const CapsModal = ({ onClose }) => {
  // ESC bilan yopish
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return createPortal(
    <div className="capsmodal" onClick={onClose}>
      <div
        className="capsmodal__box"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Booking Capsule</h2>
        <p>Here will be booking form or info</p>

        <button className="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default CapsModal;
