import React from "react";
import "./rules.scss";
import { RiTelegram2Fill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Rules = () => {
  const { t } = useTranslation();

  const socials = (
    <div className="rules__socials">
      <a href="" className="footer__social">
        <RiTelegram2Fill />
      </a>
      <a href="" className="footer__social">
        <AiFillInstagram />
      </a>
      <a href="" className="footer__social">
        <FaGoogle />
      </a>
    </div>
  );

  return (
    <div className="rules">
      <div className="container">
        <h1 className="rules__title">{t("rules_title")}</h1>

        <div className="rules__box">
          <div className="rules__card">
            <h2 className="rules__card-title">{t("rules_1_title")}</h2>
            <p className="rules__card-text">{t("rules_1_text")}</p>
            <div className="rules__card-line"></div>
            {socials}
          </div>

          <div className="rules__card">
            <h2 className="rules__card-title">{t("rules_2_title")}</h2>
            <p className="rules__card-text">{t("rules_2_text")}</p>
            <div className="rules__card-line"></div>
            {socials}
          </div>

          <div className="rules__card">
            <h2 className="rules__card-title">{t("rules_3_title")}</h2>
            <p className="rules__card-text">{t("rules_3_text")}</p>
            <div className="rules__card-line"></div>
            {socials}
          </div>

          <div className="rules__card">
            <h2 className="rules__card-title">{t("rules_4_title")}</h2>
            <p className="rules__card-text">{t("rules_4_text")}</p>
            <div className="rules__card-line"></div>
            {socials}
          </div>

          <div className="rules__card">
            <h2 className="rules__card-title">{t("rules_5_title")}</h2>
            <p className="rules__card-text">{t("rules_5_text")}</p>
            <div className="rules__card-line"></div>
            {socials}
          </div>

          <div className="rules__card">
            <h2 className="rules__card-title">{t("rules_6_title")}</h2>
            <p className="rules__card-text">{t("rules_6_text")}</p>
            <div className="rules__card-line"></div>
            {socials}
          </div>

          <div className="rules__card">
            <h2 className="rules__card-title">{t("rules_7_title")}</h2>
            <p className="rules__card-text">{t("rules_7_text")}</p>
            <div className="rules__span-card">
              <span>{t("rules_contact_phone")}</span>
              <span>{t("rules_contact_email")}</span>
            </div>
            <div className="rules__card-line"></div>
            {socials}
          </div>

          <div className="rules__card">
            <h2 className="rules__card-title">{t("rules_8_title")}</h2>
            <p className="rules__card-text">{t("rules_8_text")}</p>
            <div className="rules__card-line"></div>
            {socials}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
