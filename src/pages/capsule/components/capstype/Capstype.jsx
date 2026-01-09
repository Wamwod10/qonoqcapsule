import React, { useState } from "react";
import "./capstype.scss";
import {
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

  const [selectedType, setSelectedType] = useState(null);

  React.useEffect(() => {
    const data = sessionStorage.getItem("qonoq_booking");
    if (data) {
      const parsed = JSON.parse(data);
      setSelectedType(parsed.capsuleTypeValue); // "standard" yoki "family"
    }
  }, []);
  return (
    <>
      <div className="capstype">
        <div className="container">
          <h2 className="qonoq__title">{t("capstype_title")}</h2>

          <div className="capstype__box">
            {/* ================= STANDARD CAPSULE ================= */}
            <div className="capstype__card">
              <img className="capstype__img" src="/10.jpg" alt="" />

              <div className="capstype__prices">
                <a href="#!" className="capstype__price-link">
                  {t("standard_price_4h")}
                </a>
                <a href="#!" className="capstype__price-link">
                  {t("standard_price_6h")}
                </a>
                <a href="#!" className="capstype__price-link">
                  {t("standard_price_8h")}
                </a>
              </div>

              <div className="capstype__div">
                <h2 className="capstype__title">{t("standard_title")}</h2>

                <div className="caps__info-card">
                  <p className="caps__card-guest">
                    <FaUserAlt className="caps__icon" /> {t("standard_guests")}
                  </p>
                  <p className="caps__card-guest">
                    <TbArrowAutofitHeight className="caps__icon" />{" "}
                    {t("standard_size")}
                  </p>
                </div>

                <a href="#!" className="caps__card-guest capstype__location">
                  <FaLocationArrow className="caps__icon" />{" "}
                  {t("capsule_location")}
                </a>

                <p className="capstype__text">{t("standard_description")}</p>

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
                    {/* <a href="#!" className="caps__ft-link">
                      <MdAir className="caps__ft-icon" />
                      {t("capsules_feature_climate")}
                    </a> */}
                  </div>

                  <div className="capstype__link-div">
                    <button
                      className="qonoq__big-link capstype__link"
                      disabled={selectedType === "family"}
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
                  {t("family_price_4h")}
                </a>
                <a href="#!" className="capstype__price-link">
                  {t("family_price_6h")}
                </a>
                <a href="#!" className="capstype__price-link">
                  {t("family_price_10h")}
                </a>
              </div>

              <div className="capstype__div">
                <h2 className="capstype__title">{t("family_title")}</h2>

                <div className="caps__info-card">
                  <p className="caps__card-guest">
                    <FaUserAlt className="caps__icon" /> {t("family_guests")}
                  </p>
                  <p className="caps__card-guest">
                    <TbArrowAutofitHeight className="caps__icon" />{" "}
                    {t("family_size")}
                  </p>
                </div>

                <a href="#!" className="caps__card-guest capstype__location">
                  <FaLocationArrow className="caps__icon" />{" "}
                  {t("capsule_location")}
                </a>

                <p className="capstype__text">{t("family_description")}</p>

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
                    {/* <a href="#!" className="caps__ft-link">
                      <MdAir className="caps__ft-icon" />
                      {t("capsules_feature_climate")}
                    </a> */}
                  </div>

                  <div className="capstype__link-div">
                    <button
                      className="qonoq__big-link capstype__link"
                      disabled={selectedType === "standard"}
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

      {isModalOpen && <CapsModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Capstype;
