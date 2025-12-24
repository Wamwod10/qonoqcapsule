import "./hoteladresses.scss";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const HotelAddress = () => {
  const { t } = useTranslation();

  return (
    <div className="hotel">
      <h2 className="emergency__phone-title">{t("hotel_address_title")}</h2>

      <div className="hotel__address-box">
        <div className="emergency__link">
          <IoLocationOutline className="hotel__icon" />
        </div>

        <div className="hotel__text-wrapper">
          <p className="hotel__address-line1">{t("hotel_address_line1")}</p>
          <p className="hotel__address-line2">{t("hotel_address_line2")}</p>
        </div>
      </div>

      <a
        href="https://www.google.com/maps/search/?api=1&query=Tashkent+International+Airport+Terminal+2"
        className="hotel__btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLocationArrow className="hotel__btn-icon" />
        {t("hotel_get_directions")}
      </a>
    </div>
  );
};

export default HotelAddress;
