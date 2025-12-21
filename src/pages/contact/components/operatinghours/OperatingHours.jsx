import "./operatinghours.scss";
import {
  MdOutlineAirportShuttle,
  MdOutlineLuggage,
  MdOutlineAttachMoney,
  MdOutlineLogin,
} from "react-icons/md";
// import { useTranslation } from "react-i18next";

const OperatingHours = () => {
  // const { t } = useTranslation();

  const services = [
    {
      title: "Shuttle Service",
      time: "5:00 - 23:30",
      icon: <MdOutlineAirportShuttle className="hours__icon" />,
      className: "shuttle",
    },
    {
      title: "Express Check-In",
      time: "Always Open",
      icon: <MdOutlineLogin className="hours__icon" />,
      className: "checkin",
    },
    {
      title: (
        <a
          href="https://baggageroom.uz"
          target="_blank"
          rel="noopener noreferrer"
          className="hours__link"
        >
          Luggage Storage
        </a>
      ),
      time: "05:00 – 23:00",
      icon: <MdOutlineLuggage className="hours__icon" />,
      className: "luggage",
    },
    {
      title: "Currency Exchange",
      time: "Always Open",
      icon: <MdOutlineAttachMoney className="hours__icon" />,
      className: "currency",
    },
  ];

  return (
    <div className="hours">
      <div className="container">
        <div className="emergency__phone-box">
          <h2 className="emergency__phone-title hours__title">Quick Services in Airport</h2>
          <div className="hours__list">
            {services.map((service, index) => (
              <div className={`hours__item ${service.className}`} key={index}>
                <div className="emergency__link">{service.icon}</div>
                <div className="hours__info">
                  <h3 className="hours__info-title">{service.title}</h3>
                  <p className="hours__info-time">{service.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatingHours;
