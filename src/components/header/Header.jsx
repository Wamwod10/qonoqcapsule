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
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
