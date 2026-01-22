import "./operatinghours.scss";
import {
  MdOutlineAirportShuttle,
  MdOutlineLuggage,
  MdOutlineAttachMoney,
  MdOutlineLogin,
} from "react-icons/md";
import { useTranslation } from "react-i18next";

const OperatingHours = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("hours_shuttle"),
      time: t("hours_shuttle_time"),
      icon: <MdOutlineAirportShuttle className="hours__icon" />,
      className: "shuttle",
    },
    {
      title: t("hours_checkin"),
      time: t("hours_always_open"),
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
          {t("hours_luggage")}
        </a>
      ),
      time: t("hours_luggage_time"),
      icon: <MdOutlineLuggage className="hours__icon" />,
      className: "luggage",
    },
    {
      title: t("hours_currency"),
      time: t("hours_always_open"),
      icon: <MdOutlineAttachMoney className="hours__icon" />,
      className: "currency",
    },
  ];

  return (
    <div className="hours">
      <div className="container">
        <div className="emergency__phone-box">
          <h2 className="emergency__phone-title hours__title">
            {t("hours_title")}
          </h2>

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
