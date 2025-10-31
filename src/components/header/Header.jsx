import React from "react";
import { useTranslation, Trans } from "react-i18next";
import "./header.scss";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="header">
      <div className="container">
        <div className="header__box">
          <div className="header__right">
            <h1 className="header__title">
              <Trans
                i18nKey="hero_title"
                components={{ bold: <span /> }}
                values={{ brand: t("brand_full") }}
              />
            </h1>

            <p className="header__text">{t("hero_subtitle")}</p>

            <div className="header__box-link">
              <a href="/capsules" className="header__link">
                {t("cta_see_capsules")}
              </a>
              <a href="/capsules" className="header__link">
                {t("cta_book_now")}
              </a>
            </div>

            <p className="header__founder">
              {t("founder_label")} <span>{t("founder_name")}</span>
            </p>
          </div>

          <div className="header__left">
            <h2 className="header__left-title">{t("book_your_stay")}</h2>

            <form className="header__form" onSubmit={(e) => e.preventDefault()}>
              <div className="header__form-flex">
                <div className="header__form-box check-in">
                  <label htmlFor="checkin" className="header__form-title">
                    {t("check_in")}
                  </label>
                  <input
                    className="header__form-input"
                    type="date"
                    id="checkin"
                    name="check_in"
                    required
                    aria-label={t("check_in")}
                  />
                </div>

                <div className="header__form-box check-in">
                  <label htmlFor="checkinTime" className="header__form-title">
                    {t("check_in_time")}
                  </label>
                  <input
                    className="header__form-input"
                    type="time"
                    id="checkinTime"
                    name="check_in_time"
                    required
                    aria-label={t("check_in_time")}
                  />
                </div>
              </div>

              <div className="header__form-box">
                <label htmlFor="capsuleType" className="header__form-title">
                  {t("capsules_label")}
                </label>
                <select
                  id="capsuleType"
                  name="capsule_type"
                  className="header__form-input header__select"
                  aria-label={t("capsules_label")}
                  defaultValue="standard"
                >
                  <option value="standard">{t("capsule_standard")}</option>
                  <option value="family">{t("capsule_family")}</option>
                </select>
              </div>

              <div className="header__form-box">
                <label htmlFor="stayDuration" className="header__form-title">
                  {t("duration_label")}
                </label>
                <select
                  id="stayDuration"
                  name="duration"
                  className="header__form-input header__select"
                  aria-label={t("duration_label")}
                  defaultValue="2h"
                >
                  <option value="2h">{t("duration_2h")}</option>
                  <option value="4h">{t("duration_4h")}</option>
                  <option value="10h">{t("duration_10h")}</option>
                  <option value="1d">{t("duration_1d")}</option>
                </select>
              </div>

              <div className="header__form-box">
                <label htmlFor="location" className="header__form-title">
                  {t("select_location")}
                </label>
                <select
                  id="location"
                  name="location"
                  className="header__form-input header__select"
                  aria-label={t("select_location")}
                  defaultValue="tas"
                >
                  <option value="tas">{t("loc_tas")}</option>
                  <option value="buh">{t("loc_buh")}</option>
                  <option value="ind">{t("loc_ind")}</option>
                </select>
              </div>
            </form>

            <div className="header__link-box">
              <a href="" className="header__left-link">
                {t("check_availability")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
