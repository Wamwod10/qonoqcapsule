import React from "react";
import "./footer.scss";
import { RiTelegram2Fill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__box">
          <div className="footer__div">
            <div className="footer__card">
              <a href="/" className="nav__logo">
                <img src="/6.png" alt="" />
              </a>
              <p className="footer__text">
                Qo'noq Capsule offers a calm, private, and modern space to rest,
                delivering quality comfort and exceptional service.
              </p>
              <div className="footer__socials">
                <a href="" className="footer__social">
                  <RiTelegram2Fill />
                </a>
                <a href="" className="footer__social">
                  <AiFillInstagram />
                </a>
                <a href="" className="footer__social">
                  <FaGoogle />
                </a>
              </div>
            </div>
            <div className="footer__card">
              <h2 className="footer__card-title">Quick Links</h2>
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Home
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Capsules
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Services
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Rules
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    Contact
                  </a>
                </li>
                <li className="footer__item">
                  <a href="" className="footer__link">
                    My Booking
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer__card">
              <h2 className="footer__card-title">Contact Info</h2>
              <p className="footer__card-contact">
                Inside Tashkent International Airport, near Terminal 2, Tashkent
                city
              </p>
              <p class="footer__card-contact">
                Phone: <a href="tel:+998958772424">+998 95 877-24-24</a>
              </p>
              <p className="footer__card-contact">
                Email:{" "}
                <a href="mailto:qonoqhotel@mail.ru">qonoqhotel@mail.ru</a>
              </p>
            </div>
          </div>
          <div className="footer__line"></div>
          <p className="footer__line-text">© 2026 Qonoq Capsule. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
