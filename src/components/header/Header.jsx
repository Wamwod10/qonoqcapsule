import React, { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "./header.scss";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [capsuleType, setCapsuleType] = useState("standard");
  const [duration, setDuration] = useState("4h");
  const [locationValue, setLocationValue] = useState("tas");

  const [busyTime, setBusyTime] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /* ================= VALIDATION ================= */

  const validate = () => {
    const newErrors = {};

    if (!checkIn)
      newErrors.checkIn = t("required", { defaultValue: "Required" });
    if (!checkInTime)
      newErrors.checkInTime = t("required", { defaultValue: "Required" });
    if (!duration)
      newErrors.duration = t("required", { defaultValue: "Required" });
    if (!capsuleType)
      newErrors.capsuleType = t("required", { defaultValue: "Required" });
    if (!locationValue)
      newErrors.location = t("required", { defaultValue: "Required" });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setBusyTime(null);
    setLoading(true);

    const durationMap = { "4h": 4, "2h": 2, "6h": 6, "10h": 10, "1d": 1 };

    const branch =
      locationValue === "tas"
        ? "airport"
        : locationValue === "buh"
          ? "city"
          : "north";

    let available = false;

    try {
      const res = await fetch(
        "https://qonoqcapsule-backend.onrender.com/api/check-availability",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            branch,
            capsuleType,
            date: checkIn,
            time: checkInTime,
            duration: durationMap[duration],
          }),
        },
      );

      const data = await res.json();

      if (data.available === true) {
        available = true;
      } else {
        setBusyTime({
          time: data.nextTime,
          nextDay: data.nextDay,
        });
      }
    } catch (err) {
      alert("Server error. Try again.");
      setLoading(false);
      return;
    }

    if (!available) {
      setLoading(false);
      return; // ❗ bu yerda QATTIQ to‘xtaydi
    }

    /* ===== faqat available bo‘lsa pastga tushadi ===== */

    const bookingState = {
      checkIn,
      checkInTime,
      durationValue: duration,
      capsuleTypeValue: capsuleType,
      locationValue,

      durationLabel: t(`duration_${duration}`, { defaultValue: duration }),
      capsuleTypeLabel:
        capsuleType === "standard"
          ? t("capsule_standard")
          : t("capsule_family"),
      locationLabel:
        locationValue === "tas"
          ? t("loc_tas")
          : locationValue === "buh"
            ? t("loc_buh")
            : t("loc_ind"),

      createdAt: new Date().toISOString(),
    };

    try {
      sessionStorage.setItem("qonoq_booking", JSON.stringify(bookingState));
    } catch {}

    setLoading(false);
    navigate("/capsule", { state: bookingState });
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header__box">
          {/* ===== RIGHT ===== */}
          <div className="header__right">
            <h1 className="header__title">
              <Trans
                i18nKey="hero_title"
                components={{ bold: <span /> }}
                values={{ brand: "Qonoq Capsule" }}
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

          {/* ===== LEFT ===== */}
          <div className="header__left">
            <h2 className="header__left-title">{t("book_your_stay")}</h2>

            <form className="header__form" onSubmit={handleSubmit}>
              <div className="header__form-flex">
                <div className="header__form-box check-in">
                  <label htmlFor="checkin" className="header__form-title">
                    {t("check_in")}
                  </label>
                  <input
                    className="header__form-input"
                    type="date"
                    id="checkin"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                  {errors.checkIn && (
                    <small className="form-error">{errors.checkIn}</small>
                  )}
                </div>

                <div className="header__form-box check-in">
                  <label htmlFor="checkinTime" className="header__form-title">
                    {t("check_in_time")}
                  </label>
                  <input
                    className="header__form-input"
                    type="time"
                    id="checkinTime"
                    required
                    value={checkInTime}
                    onChange={(e) => setCheckInTime(e.target.value)}
                  />
                  {errors.checkInTime && (
                    <small className="form-error">{errors.checkInTime}</small>
                  )}
                </div>
              </div>

              <div className="header__form-box">
                <label className="header__form-title">
                  {t("capsules_label")}
                </label>
                <select
                  className="header__form-input header__select"
                  value={capsuleType}
                  onChange={(e) => setCapsuleType(e.target.value)}
                >
                  <option value="standard">{t("capsule_standard")}</option>
                  <option value="family">{t("capsule_family")}</option>
                </select>
              </div>

              <div className="header__form-box">
                <label className="header__form-title">
                  {t("duration_label")}
                </label>
                <select
                  className="header__form-input header__select"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="2h">{t("duration_2h")}</option>
                  <option value="4h">{t("duration_4h")}</option>
                  <option value="6h">{t("duration_6h")}</option>
                  <option value="10h">{t("duration_10h")}</option>
                  <option value="1d">{t("duration_1d")}</option>
                </select>
              </div>

              <div className="header__form-box">
                <label className="header__form-title">
                  {t("select_location")}
                </label>
                <select
                  className="header__form-input header__select"
                  value={locationValue}
                  onChange={(e) => setLocationValue(e.target.value)}
                >
                  <option value="tas">{t("loc_tas")}</option>
                  <option value="buh">{t("loc_buh")}</option>
                  <option value="ind">{t("loc_ind")}</option>
                </select>
              </div>

              {/* ===== BUSY MESSAGE ===== */}
              {busyTime && (
                <div className="availability-modal">
                  <div className="availability-modal__box">
                    <p className="availability__modal-text">
                      Capsule is busy! Next available time:
                      {/* <br /> */}
                      <b>
                        {busyTime.time}
                        {busyTime.nextDay &&
                          `  (${t("next_day", { defaultValue: "Next day" })})`}
                      </b>
                    </p>
                    {/* <button
                      type="button"
                      className="availability-modal__btn"
                      onClick={() => setBusyTime(null)}
                    >
                      OK
                    </button> */}
                  </div>
                </div>
              )}

              <div className="header__link-box">
                <button
                  type="submit"
                  className="header__left-link"
                  disabled={loading}
                >
                  {loading
                    ? t("checking", { defaultValue: "Checking..." })
                    : t("check_availability")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
