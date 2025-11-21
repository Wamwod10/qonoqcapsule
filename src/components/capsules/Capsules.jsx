import React from "react";
import "./capsules.scss";
import {
  FaBed,
  FaFan,
  FaLocationArrow,
  FaLock,
  FaPlug,
  FaUserAlt,
} from "react-icons/fa";
import { TbArrowAutofitHeight } from "react-icons/tb";
import { MdAir, MdHearingDisabled, MdLightMode, MdOutlineLight, MdPowerSettingsNew, MdWifi } from "react-icons/md";
import { GiMirrorMirror } from "react-icons/gi";

const Capsules = () => {
  return (
    <div className="caps">
      <div className="container">
        <h1 className="caps__title">
          Quiet Capsules — calm zone, comfort sleep
        </h1>
        <div className="caps__box">
          <div className="caps__big-card">
            <div className="caps__card">
              <div className="caps__title-card">
                <h2 className="caps__card-title">Standard Capsules</h2>
                <div className="caps__info-card">
                  <p className="caps__card-guest">
                    <FaUserAlt className="caps__icon" /> 1 Guest
                  </p>
                  <p className="caps__card-guest">
                    <TbArrowAutofitHeight className="caps__icon" />
                    1.2m x 2m
                  </p>
                </div>
              </div>
              <a href="#!" className="caps__card-guest">
                <FaLocationArrow className="caps__icon" /> Tashkent
                International Airport
              </a>
              <p className="caps__card-text">
                The standard capsule is a private, quiet, and secure mini-space
                designed for short rest at the airport. It includes an
                orthopedic bed, ventilation, adjustable lighting, and charging
                ports.
              </p>
              <div className="caps__card-features">
                <h2 className="caps__ft-title">Features:</h2>
                <div className="caps__features">
                  <a href="" className="caps__ft-link">
                    <FaBed className="caps__ft-icon" />
                    Bed
                  </a>
                  <a href="" className="caps__ft-link">
                    <MdLightMode className="caps__ft-icon" />
                    Lighting
                  </a>
                  <a href="" className="caps__ft-link">
                    <FaPlug className="caps__ft-icon" />
                    Outlet
                  </a>
                  <a href="" className="caps__ft-link">
                    <FaFan className="caps__ft-icon" />
                    Airflow
                  </a>
                  <a href="" className="caps__ft-link">
                    <MdWifi className="caps__ft-icon" />
                    Wi-Fi
                  </a>
                  <a href="" className="caps__ft-link">
                    <FaLock className="caps__ft-icon" />
                    Safe
                  </a>
                  <a href="" className="caps__ft-link">
                    <MdPowerSettingsNew className="caps__ft-icon" />
                    Power
                  </a>
                  <a href="" className="caps__ft-link">
                    <MdAir className="caps__ft-icon" />
                    Climate
                  </a>
                </div>
              </div>
              <div className="qonoq__big-links">
                <a href="" className="qonoq__big-link">
                  See Gallery
                </a>
                <a href="" className="qonoq__big-link">
                  Booking Now
                </a>
              </div>
            </div>
            <div className="caps__img-card">
              <div className="caps__price-div">
                <p className="caps__duration">Up to 4 hours</p>
                <p className="caps__price">400 000 so'm</p>
              </div>
              <div className="caps__price-div">
                <p className="caps__duration">Up to 6 hours</p>
                <p className="caps__price">600 000 so'm</p>
              </div>
              <div className="caps__price-div">
                <p className="caps__duration">Up to 8 hours</p>
                <p className="caps__price">800 000 so'm</p>
              </div>
            </div>
          </div>
          <div className="caps__big-card">
            <div className="caps__imgsec-card">
              <div className="caps__price-div">
                <p className="caps__duration">Up to 4 hours</p>
                <p className="caps__price">600 000 so'm</p>
              </div>
              <div className="caps__price-div">
                <p className="caps__duration">Up to 6 hours</p>
                <p className="caps__price">800 000 so'm</p>
              </div>
              <div className="caps__price-div">
                <p className="caps__duration">Up to 10 hours</p>
                <p className="caps__price">1 000 000 so'm</p>
              </div>
            </div>
            <div className="caps__card">
              <div className="caps__title-card">
                <h2 className="caps__card-title">Family Capsules</h2>
                <div className="caps__info-card">
                  <p className="caps__card-guest">
                    <FaUserAlt className="caps__icon" /> 2 Guests
                  </p>
                  <p className="caps__card-guest">
                    <TbArrowAutofitHeight className="caps__icon" />
                    2.4m x 2m
                  </p>
                </div>
              </div>
              <a href="#!" className="caps__card-guest">
                <FaLocationArrow className="caps__icon" /> Tashkent
                International Airport
              </a>
              <p className="caps__card-text">
                The family capsule is a spacious, private, and secure
                mini-space designed for two people to rest comfortably at the
                airport. It includes a larger orthopedic bed, individual
                ventilation, adjustable lighting, and charging ports.
              </p>
              <div className="caps__card-features">
                <h2 className="caps__ft-title">Features:</h2>
                <div className="caps__features">
                  <a href="" className="caps__ft-link">
                    <GiMirrorMirror className="caps__ft-icon" />
                    Mirror
                  </a>
                  <a href="" className="caps__ft-link">
                    <MdHearingDisabled className="caps__ft-icon" />
                    Soundproof Panels
                  </a>
                  <a href="" className="caps__ft-link">
                    <FaPlug className="caps__ft-icon" />
                    Outlet
                  </a>
                  <a href="" className="caps__ft-link">
                    <FaFan className="caps__ft-icon" />
                    Airflow
                  </a>
                  <a href="" className="caps__ft-link">
                    <MdWifi className="caps__ft-icon" />
                    Wi-Fi
                  </a>
                  <a href="" className="caps__ft-link">
                    <FaLock className="caps__ft-icon" />
                    Safe
                  </a>
                  <a href="" className="caps__ft-link">
                    <MdOutlineLight className="caps__ft-icon" />
                    Reading Lamps
                  </a>
                  <a href="" className="caps__ft-link">
                    <MdAir className="caps__ft-icon" />
                    Climate
                  </a>
                </div>
              </div>
              <div className="qonoq__big-links">
                <a href="" className="qonoq__big-link">
                  See Gallery
                </a>
                <a href="" className="qonoq__big-link">
                  Booking Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capsules;
