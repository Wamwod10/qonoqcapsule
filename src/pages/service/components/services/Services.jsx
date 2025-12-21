import React from "react";
import "./services.scss";
import { FaChargingStation, FaCommentDots, FaShower } from "react-icons/fa";
import {
  MdAccessTime,
  MdAir,
  MdFlightTakeoff,
  MdLightbulbOutline,
  MdOutlineDoNotDisturb,
  MdOutlineLock,
  MdOutlineSanitizer,
  MdOutlineTouchApp,
  MdVolumeOff,
} from "react-icons/md";

const servicesData = [
  {
    icon: <MdOutlineTouchApp />,
    title: "Smart LED Control Panel",
    desc: "Touch-enabled LED control panel inside the capsule to manage lighting and basic functions.",
    tag: "Touch Enabled",
  },
  {
    icon: <MdVolumeOff />,
    title: "Soundproof Capsule System",
    desc: "Advanced sound-insulated walls reduce airport noise for deep rest and privacy.",
    tag: "Smart System",
  },
  {
    icon: <MdLightbulbOutline />,
    title: "Ambient LED Lighting",
    desc: "Soft ambient LED lighting designed for relaxation and eye comfort.",
    tag: "Smart Control",
  },
  {
    icon: <MdAir />,
    title: "Private Ventilation Flow",
    desc: "Individual air circulation system inside each capsule for fresh airflow.",
    tag: "Tech Powered",
  },
  {
    icon: <MdOutlineDoNotDisturb />,
    title: "Quiet Zone Design",
    desc: "Capsule area is designed as a quiet zone with minimal movement and noise.",
    tag: "Sleep Optimized",
  },
  {
    icon: <MdAccessTime />,
    title: "Digital Time Display",
    desc: "Built-in digital clock to keep track of time while resting.",
    tag: "Designed for Comfort",
  },
  {
    icon: <FaChargingStation />,
    title: "Device Charging Hub",
    desc: "Multiple USB and Type-C ports for fast charging of personal devices.",
    tag: "Smart System",
  },
  {
    icon: <MdOutlineSanitizer />,
    title: "Hygienic Interior Materials",
    desc: "Antibacterial and easy-to-clean interior materials for maximum hygiene.",
    tag: "Guest Safety",
  },
  {
    icon: <MdOutlineLock />,
    title: "Privacy Lock System",
    desc: "Secure lock system from inside the capsule ensuring full privacy.",
    tag: "Designed for Comfort",
  },
  {
    icon: <MdFlightTakeoff />,
    title: "Airport-Integrated Location",
    desc: "Capsules are located directly inside the airport for fast and easy access.",
    tag: "On-Site Location",
  }
];

const Services = () => {
  return (
    <section className="services">
      <div className="container">
        <div className="services__header">
          <h2>Capsule Services</h2>
          <p>
            Everything you need for a calm, safe and comfortable capsule stay —
            designed with care.
          </p>
        </div>

        <div className="services__grid">
          {servicesData.map((item, index) => (
            <div className="service__card" key={index}>
              <div className="service__icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <span className="service__tag">{item.tag}</span>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
