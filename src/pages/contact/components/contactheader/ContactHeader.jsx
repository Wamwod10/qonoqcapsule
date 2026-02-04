import React from "react";
import { AiOutlinePhone } from "react-icons/ai";
import "./contactheader.scss";
import { IoWarning } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const ContactHeader = () => {
  const { t } = useTranslation();

  return (
    <section className="contact-header">
      <div className="container">
        <h2 className="contact-header__title">
          {t("contact_header_title")}
        </h2>

        <p className="contact-header__subtitle">
          {t("contact_header_subtitle")}
        </p>

        <div className="contact-alert">
          <div className="contact-alert__info">
            <IoWarning className="contact-alert__icon" />
            <div className="contact-alert__text">
              <p className="contact-alert__main-text">
                {t("contact_alert_text")}
              </p>
              <p className="contact-alert__number">
                +998 95 232 24 24
              </p>
            </div>
          </div>

          <a href="tel:+998958772424" className="contact-alert__button">
            <AiOutlinePhone className="contact-alert__button-icon" />
            {t("contact_alert_call")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactHeader;
