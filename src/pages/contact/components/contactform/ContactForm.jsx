import React from "react";
import { FaLocationArrow, FaUtensils, FaTaxi } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { LuExternalLink } from "react-icons/lu";
import { MdMarkEmailRead } from "react-icons/md";
import { useTranslation } from "react-i18next";
import "./contactform.scss";

const ContactForm = () => {
  const { t } = useTranslation();

  return (
    <div className="contactform">
      <div className="container">
        <div className="contactform__box">
          <div className="contactform__title-box">
            <h2 className="contactform__title">
              {t("contact_location_title")}
            </h2>
            <a
              href="https://www.google.com/maps/place/Khamsa+hotel+taschkent+airoport/@41.2620646,69.2675622,3a,75y,322.94h,76.57t/data=!3m8!1e1!3m6!1sCIHM0ogKEICAgIDav4jwIg!2e10!3e11!6shttps:%2F%2Flh3.googleusercontent.com%2Fgpms-cs-s%2FAB8u6HYzQPpOSG5huCCz7Pn98iBi3z0mgak7rmiWPbsQBwEQRqXBcFXV9zlFw5nnvhz7VPKQld_qPqArkncvTR7YJsXbiE7cKWuNnFIiIkp5tst7bxoED9XGqSjQ7EjOcgK-75l0YLM%3Dw900-h600-k-no-pi13.430341118955397-ya183.93791184466573-ro0-fo100!7i11264!8i5632!4m20!1m10!3m9!1s0x38ae61007cb3de3b:0x62705b2323c597e!2sKhamsa+hotel+taschkent+airoport!5m2!4m1!1i2!8m2!3d41.261939!4d69.2674976!16s%2Fg%2F11whhjjr13!3m8!1s0x38ae61007cb3de3b:0x62705b2323c597e!5m2!4m1!1i2!8m2!3d41.261939!4d69.2674976!16s%2Fg%2F11whhjjr13?entry=ttu&g_ep=EgoyMDI1MDgxNy4wIKXMDSoASAFQAw%3D%3D"
              className="contactform__link"
            >
              <FaLocationArrow /> {t("contact_get_directions")}
            </a>
          </div>

          <div className="contactform__map-box">
            <iframe
              className="contactform__map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.6087235148198!2d69.26492267656143!3d41.261943003766085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae61007cb3de3b%3A0x62705b2323c597e!2sKhamsa%20hotel%20taschkent%20airoport!5e1!3m2!1sru!2s!4v1755668900789!5m2!1sru!2s"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="contactform__map-div">
              <h3 className="contactform__map-title">
                {t("contact_hotel_name")}
              </h3>
              <p className="contactform__map-text">
                {t("contact_hotel_address")}
              </p>
            </div>
          </div>

          <div className="contactform__nears">
            <h3 className="contactform__nears-title">
              {t("contact_nearby_title")}
            </h3>

            <div className="contactform__nears-box">
              <div className="contactform__nears-div">
                <div className="contactform__titles-div">
                  <div className="contactform__nears-icon">
                    <GiShoppingBag className="icon icon-rotate" />
                  </div>
                  <div>
                    <h3 className="contactform__div-title">
                      {t("contact_near_dutyfree")}
                    </h3>
                    <p className="contactform__div-text">200–300 m</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/Duty+Free+Uzbekistan/"
                  className="contactform__nears-icon"
                >
                  <LuExternalLink className="icon" />
                </a>
              </div>

              <div className="contactform__nears-div">
                <div className="contactform__titles-div">
                  <div className="contactform__nears-icon">
                    <FaUtensils className="icon icon-rotate" />
                  </div>
                  <div>
                    <h3 className="contactform__div-title">
                      {t("contact_near_dining")}
                    </h3>
                    <p className="contactform__div-text">150–250 m</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/Pie+republic+airport/"
                  className="contactform__nears-icon"
                >
                  <LuExternalLink className="icon" />
                </a>
              </div>

              <div className="contactform__nears-div">
                <div className="contactform__titles-div">
                  <div className="contactform__nears-icon">
                    <MdMarkEmailRead className="icon icon-rotate" />
                  </div>
                  <div>
                    <h3 className="contactform__div-title">
                      {t("contact_near_post")}
                    </h3>
                    <p className="contactform__div-text">300–350 m</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/post+office+in+airport+tashkent"
                  className="contactform__nears-icon"
                >
                  <LuExternalLink className="icon" />
                </a>
              </div>

              <div className="contactform__nears-div">
                <div className="contactform__titles-div">
                  <div className="contactform__nears-icon">
                    <FaTaxi className="icon icon-rotate" />
                  </div>
                  <div>
                    <h3 className="contactform__div-title">
                      {t("contact_near_taxi")}
                    </h3>
                    <p className="contactform__div-text">50–100 m</p>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/place/Taxi+Airport+Tashkent/"
                  className="contactform__nears-icon"
                >
                  <LuExternalLink className="icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
