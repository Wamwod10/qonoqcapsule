import React from "react";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__box">
          <div className="header__right">
            <h1 className="header__title">
              Calm, comfortable rest — capsules for your journey, with{" "}
              <span>Qo'noq Capsule</span>
            </h1>
            <p className="header__text">
              No long lines, 24/7 access, fast check-in, and recharge in clean,
              safe capsules.
            </p>
            <div className="header__box-link">
              <a href="/capsules" className="header__link">
                See Capsules
              </a>
              <a href="/capsules" className="header__link">
                Book Now
              </a>
            </div>
            <p className="header__founder">
              Founder: <span>Abdukayum Abdullayev Abdusattarovich</span>
            </p>
          </div>

          <div className="header__left">
            <h2 className="header__left-title">Book Your Stay</h2>

            <form className="header__form" onSubmit={(e) => e.preventDefault()}>
              <div className="header__form-flex">
                <div className="header__form-box check-in">
                  <label htmlFor="checkin" className="header__form-title">
                    Check-in
                  </label>
                  <input
                    className="header__form-input"
                    type="date"
                    id="checkin"
                    name="check_in"
                    required
                    aria-label="Check-in date"
                  />
                </div>
                <div className="header__form-box check-in">
                  <label htmlFor="checkinTime" className="header__form-title">
                    Check-in Time
                  </label>
                  <input
                    className="header__form-input"
                    type="time"
                    id="checkinTime"
                    name="check_in_time"
                    required
                    aria-label="Check-in time"
                  />
                </div>
              </div>
              <div className="header__form-box">
                <label htmlFor="duration" className="header__form-title">
                  Capsules
                </label>
                <select
                  id="duration"
                  name="duration"
                  className="header__form-input header__select"
                  defaultValue="type"
                  aria-label="Duration"
                >
                  <option value="Standard">Standard Capsule</option>
                  <option value="Family">Family Capsule</option>
                </select>
              </div>
              <div className="header__form-box">
                <label htmlFor="duration" className="header__form-title">
                  Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  className="header__form-input header__select"
                  defaultValue="3h"
                  aria-label="Duration"
                >
                  <option value="3h">Up to 2 hours</option>
                  <option value="10h">Up to 4 hours</option>
                  <option value="1d">Up to 10 hours</option>
                  <option value="1d">1 day</option>
                </select>
              </div>
              <div className="header__form-box">
                <label htmlFor="duration" className="header__form-title">
                  Select Location
                </label>
                <select
                  id="duration"
                  name="duration"
                  className="header__form-input header__select"
                  defaultValue="Capsule"
                  aria-label="Duration"
                >
                  <option value="1">Tashkent Airport</option>
                  <option value="2">Bukhara</option>
                  <option value="3">India</option>
                </select>
              </div>
            </form>
            <div className="header__link-box">
              <a href="" className="header__left-link">
                Check Availability
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
