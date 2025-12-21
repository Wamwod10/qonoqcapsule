import React from "react";
import "./serviceheader.scss";

const Serviceheader = () => {
  return (
    <div className="serviceheader">
      <div className="container">
        <div className="serviceheader__box">
          <div className="service__card-left">
            <h1 className="serviceheader__title">
              Premium Services for Your Capsule Stay
            </h1>
            <p className="serviceheader__text1">
              Experience essential comfort with services designed for a relaxing
              capsule stay.
            </p>
            <p className="serviceheader__text2">
              At Qonoq Capsule Hotel, we combine smart technology with
              thoughtful amenities to create a peaceful and reliable
              environment. From seamless check-in to well-maintained facilities,
              every service is crafted to make your stay comfortable, secure,
              and pleasantly memorable.
            </p>
            <div className="serviceheader__big-links">
              <a href="#!" className="qonoq__big-link">
                Booking Now
              </a>
              <a href="#!" className="qonoq__big-link">
                Contact Now
              </a>
            </div>
          </div>
          <div className="serviceheader__img">
            <img src="/public/26.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Serviceheader;
