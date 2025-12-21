import React from "react";
import "./rules.scss";
import { RiTelegram2Fill } from "react-icons/ri";
import { AiFillInstagram } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";

const Rules = () => {
  return (
    <div className="rules">
      <div className="container">
        <h1 className="rules__title">Public Rules For Qo'noq Capsule</h1>
        <div className="rules__box">
          <div className="rules__card">
            <h2 className="rules__card-title">Subject of the Offer</h2>
            <p className="rules__card-text">
              This Offer provides information about the Hotel’s services,
              including room reservations, payment procedures, cancellation
              policies and data privacy policies. By booking a room at the
              Hotel, you (“Guest”) agree to be bound by the terms and conditions
              set forth in this Offer.
            </p>
            <div className="rules__card-line"></div>
            <div className="rules__socials">
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
          <div className="rules__card">
            <h2 className="rules__card-title">Order and payment methods</h2>
            <p className="rules__card-text">
              Guests can book rooms through the Hotel’s website or by contacting
              the front desk at +99895-877-24-24. The hotel accepts the
              following payment methods: Online payment through a secure payment
              gateway. Payment by credit card at the time of booking or
              check-in. Payment in cash upon check-in.
            </p>
            <div className="rules__card-line"></div>
            <div className="rules__socials">
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
          <div className="rules__card">
            <h2 className="rules__card-title">
              Return of goods (Refuses of services)
            </h2>
            <p className="rules__card-text">
              Guests can cancel their reservation free of charge up to 3 days
              before the arrival date. Cancellations made within [number] days
              of arrival will be subject to a penalty of [percentage]% of the
              total booking amount. In case of a no-show without prior
              cancellation, the full cost of the booking will be charged. To
              cancel, please contact us via phone, WhatsApp, or Telegram at
              [phone number]. In rare cases where the hotel must cancel a
              confirmed reservation, the guest will be informed as soon as
              possible and offered either a room of equal or higher category, or
              a full refund.
            </p>
            <div className="rules__card-line"></div>
            <div className="rules__socials">
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
          <div className="rules__card">
            <h2 className="rules__card-title">Transaction security</h2>
            <p className="rules__card-text">
              The hotel implements standard security measures to protect all
              online transactions. Payment information is encrypted using Secure
              Sockets Layer (SSL) technology.
            </p>
            <div className="rules__card-line"></div>
            <div className="rules__socials">
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
          <div className="rules__card">
            <h2 className="rules__card-title">Privacy Policy</h2>
            <p className="rules__card-text">
              The Hotel respects the privacy of its Guests and is committed to
              protecting personal information. Please refer to our separate
              Privacy Policy for detailed information about how we collect, use
              and disclose your personal information.
            </p>
            <div className="rules__card-line"></div>
            <div className="rules__socials">
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
          <div className="rules__card">
            <h2 className="rules__card-title">Applicable law</h2>
            <p className="rules__card-text">
              This Offer and any disputes arising from it shall be governed by
              and construed in accordance with the laws of Uzbekistan.
            </p>
            <div className="rules__card-line"></div>
            <div className="rules__socials">
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
          <div className="rules__card">
            <h2 className="rules__card-title">Contact information</h2>
            <p className="rules__card-text">
              For any questions or concerns regarding this Offer, please contact
              the hotel at:
            </p>
            <div className="rules__span-card">
              <span> Phone: +99895-877-24-24</span>
              <span> Email: qonoqhotel@mail.ru</span>
            </div>
            <div className="rules__card-line"></div>
            <div className="rules__socials">
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
          <div className="rules__card">
            <h2 className="rules__card-title">Effective date</h2>
            <p className="rules__card-text">
              This Offer is valid from 05/14/2024. The hotel reserves the right
              to change the terms of this Offer at any time without prior
              notice. We recommend that you review this offer before booking.
            </p>
            <div className="rules__card-line"></div>
            <div className="rules__socials">
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
        </div>
      </div>
    </div>
  );
};

export default Rules;
