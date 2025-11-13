import React from "react";
import "./qonoq.scss";
import { BsFillStarFill } from "react-icons/bs";
import { FaRegBell, FaRegClock } from "react-icons/fa";
import {
  MdLight,
  MdOutlineBedtime,
  MdPowerSettingsNew,
  MdWifi,
} from "react-icons/md";
import { GiPillow } from "react-icons/gi";
import { TbWindmillFilled } from "react-icons/tb";
import { WiThermometer } from "react-icons/wi";

const Qonoq = () => {
  return (
    <div className="qonoq">
      <div className="container">
        <h2 className="qonoq__title">Trusted by travelers worldwide</h2>
        <p className="qonoq__text">
          Qonoq capsules provide private and quiet rest with fast check-in
          hourly rates fresh linens charging alarm and 24/7 service
        </p>
        <div className="qonoq__small-box">
          <div className="qonoq__small-card">
            <div className="qonoq__small-icon">
              <BsFillStarFill />
            </div>
            <h2 className="qonoq__small-title">Customer Rating</h2>
            <p className="qonoq__small-text">
              Highly rated by guests on major platforms
            </p>
          </div>
          <div className="qonoq__small-card">
            <div className="qonoq__small-icon">
              <FaRegClock />
            </div>
            <h2 className="qonoq__small-title">Open 24/7</h2>
            <p className="qonoq__small-text">
              Round-the-clock service with fast check-in
            </p>
          </div>
          <div className="qonoq__small-card">
            <div className="qonoq__small-icon">
              <MdOutlineBedtime />
            </div>
            <h2 className="qonoq__small-title">On-site Availability</h2>
            <p className="qonoq__small-text">
              Private, quiet capsules ready anytime
            </p>
          </div>
          <div className="qonoq__small-card">
            <div className="qonoq__small-icon">
              <FaRegBell />
            </div>
            <h2 className="qonoq__small-title">Wake-up Service</h2>
            <p className="qonoq__small-text">
              Smart wake-up so you never oversleep
            </p>
          </div>
        </div>
        <div className="qonoq__big-box">
          <div className="qonoq__big-card">
            <h1 className="qonoq__card-title">Amenities inside the capsule</h1>
            <div className="qonoq__big-div">
              <div className="qonoq__cardd">
                <div className="qonoq__card-div">
                  <div className="qonoq__big-icon">
                    <GiPillow className="big-icon" />
                  </div>
                  <h2 className="qonoq__big-title">Bedding</h2>
                  <p className="qonoq__big-text">
                    A soft mattress and a clean pillow
                  </p>
                </div>
                <div className="qonoq__card-div">
                  <div className="qonoq__big-icon">
                    <TbWindmillFilled className="big-icon" />
                  </div>
                  <h2 className="qonoq__big-title">Ventilation</h2>
                  <p className="qonoq__big-text">
                    Constant air circulation and clean
                  </p>
                </div>
                <div className="qonoq__card-div">
                  <div className="qonoq__big-icon">
                    <MdPowerSettingsNew className="big-icon" />
                  </div>
                  <h2 className="qonoq__big-title">Charging point</h2>
                  <p className="qonoq__big-text">
                    A soft mattress and a clean pillow
                  </p>
                </div>
              </div>
              <div className="qonoq__cardd">
                <div className="qonoq__card-div">
                  <div className="qonoq__big-icon">
                    <MdLight className="big-icon" />
                  </div>
                  <h2 className="qonoq__big-title">LED lighting</h2>
                  <p className="qonoq__big-text">Adjustable LED light</p>
                </div>
                <div className="qonoq__card-div">
                  <div className="qonoq__big-icon">
                    <WiThermometer className="big-icon" />
                  </div>
                  <h2 className="qonoq__big-title">Temperature</h2>
                  <p className="qonoq__big-text">Temperature control</p>
                </div>
                <div className="qonoq__card-div">
                  <div className="qonoq__big-icon">
                    <MdWifi className="big-icon" />
                  </div>
                  <h2 className="qonoq__big-title">Wi-Fi</h2>
                  <p className="qonoq__big-text">Fast and free Wi-Fi</p>
                </div>
              </div>
            </div>
          </div>
          <div className="qonoq__big-card big-card">
            <img className="qonoq__big-img" src="/public/9.png" alt="" />
            <h2 className="qonoq__big-exp">Experience Comfort & Privacy</h2>
            <p className="qonoq__big-about">
              Our capsules provide a peaceful and clean private space designed
              for travelers who need rest between flights. Equipped with modern
              amenities and secure access, each unit offers the perfect
              environment to relax, recharge, or work quietly before your next
              journey
            </p>
            <div className="qonoq__big-links">
                <a href="" className="qonoq__big-link">Contact Now</a>
                <a href="" className="qonoq__big-link">Booking Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qonoq;
