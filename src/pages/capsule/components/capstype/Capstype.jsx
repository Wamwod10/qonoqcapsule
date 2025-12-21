import React, { useState } from "react";
import "./capstype.scss";
import {
  FaBed,
  FaFan,
  FaLocationArrow,
  FaLock,
  FaPlug,
  FaUserAlt,
} from "react-icons/fa";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { MdAir, MdLightMode, MdPowerSettingsNew, MdWifi } from "react-icons/md";
import CapsModal from "./CapsModal";

const Capstype = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="capstype">
        <div className="container">
          <h2 className="qonoq__title">Hourly & Daily Room Options</h2>

          <div className="capstype__box">
            {/* ================= STANDARD CAPSULE ================= */}
            <div className="capstype__card">
              <img className="capstype__img" src="/10.jpg" alt="" />

              <div className="capstype__prices">
                <a href="#!" className="capstype__price-link">
                  Up to 4 hours / 400 000 UZS
                </a>
                <a href="#!" className="capstype__price-link">
                  Up to 6 hours / 600 000 UZS
                </a>
                <a href="#!" className="capstype__price-link">
                  Up to 8 hours / 800 000 UZS
                </a>
              </div>

              <div className="capstype__div">
                <h2 className="capstype__title">Standard Capsule</h2>

                <div className="caps__info-card">
                  <p className="caps__card-guest">
                    <FaUserAlt className="caps__icon" /> 1 Guest
                  </p>
                  <p className="caps__card-guest">
                    <TbArrowAutofitHeight className="caps__icon" /> 1.2m x 2m
                  </p>
                </div>

                <a href="#!" className="caps__card-guest capstype__location">
                  <FaLocationArrow className="caps__icon" /> Tashkent Airport
                  Qonoq Capsule
                </a>

                <p className="capstype__text">
                  A practical and comfortable capsule designed for peace,
                  simplicity, and privacy, featuring a cozy 1.2m x 2m bed —
                  ideal for solo travelers seeking rest just a few minutes from
                  Tashkent International Airport.
                </p>

                <div className="caps__card-features">
                  <h2 className="caps__ft-title">
                    {t("capsules_features_title")}
                  </h2>

                  <div className="caps__features">
                    <a href="#!" className="caps__ft-link">
                      <MdLightMode className="caps__ft-icon" />
                      {t("capsules_feature_lighting")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <FaPlug className="caps__ft-icon" />
                      {t("capsules_feature_outlet")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <FaFan className="caps__ft-icon" />
                      {t("capsules_feature_airflow")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <MdWifi className="caps__ft-icon" />
                      {t("capsules_feature_wifi")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <FaLock className="caps__ft-icon" />
                      {t("capsules_feature_safe")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <MdPowerSettingsNew className="caps__ft-icon" />
                      {t("capsules_feature_power")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <MdAir className="caps__ft-icon" />
                      {t("capsules_feature_climate")}
                    </a>
                  </div>

                  <div className="capstype__link-div">
                    <button
                      className="qonoq__big-link capstype__link"
                      onClick={() => setIsModalOpen(true)}
                    >
                      {t("capsules_btn_booking")}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= FAMILY CAPSULE ================= */}
            <div className="capstype__card">
              <img className="capstype__img" src="/17.jpg" alt="" />

              <div className="capstype__prices">
                <a href="#!" className="capstype__price-link">
                  Up to 4 hours / 600 000 UZS
                </a>
                <a href="#!" className="capstype__price-link">
                  Up to 6 hours / 800 000 UZS
                </a>
                <a href="#!" className="capstype__price-link">
                  Up to 10 hours / 1 000 000 UZS
                </a>
              </div>

              <div className="capstype__div">
                <h2 className="capstype__title">Family Capsule</h2>

                <div className="caps__info-card">
                  <p className="caps__card-guest">
                    <FaUserAlt className="caps__icon" /> 2 Guest
                  </p>
                  <p className="caps__card-guest">
                    <TbArrowAutofitHeight className="caps__icon" /> 2.4m x 2m
                  </p>
                </div>

                <a href="#!" className="caps__card-guest capstype__location">
                  <FaLocationArrow className="caps__icon" /> Tashkent Airport
                  Qonoq Capsule
                </a>

                <p className="capstype__text">
                  A spacious and comfortable family capsule offering privacy and
                  relaxation, with a 2.4m x 2m bed — perfect for couples or
                  small families just minutes from Tashkent International
                  Airport.
                </p>

                <div className="caps__card-features">
                  <h2 className="caps__ft-title">
                    {t("capsules_features_title")}
                  </h2>

                  <div className="caps__features">
                    <a href="#!" className="caps__ft-link">
                      <MdLightMode className="caps__ft-icon" />
                      {t("capsules_feature_lighting")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <FaPlug className="caps__ft-icon" />
                      {t("capsules_feature_outlet")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <FaFan className="caps__ft-icon" />
                      {t("capsules_feature_airflow")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <MdWifi className="caps__ft-icon" />
                      {t("capsules_feature_wifi")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <FaLock className="caps__ft-icon" />
                      {t("capsules_feature_safe")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <MdPowerSettingsNew className="caps__ft-icon" />
                      {t("capsules_feature_power")}
                    </a>
                    <a href="#!" className="caps__ft-link">
                      <MdAir className="caps__ft-icon" />
                      {t("capsules_feature_climate")}
                    </a>
                  </div>

                  <div className="capstype__link-div">
                    <button
                      className="qonoq__big-link capstype__link"
                      onClick={() => setIsModalOpen(true)}
                    >
                      {t("capsules_btn_booking")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && <CapsModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Capstype;
