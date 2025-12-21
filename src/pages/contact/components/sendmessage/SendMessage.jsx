import React, { useState } from "react";
import "./sendmessage.scss";
import { LuSend } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
// import { useTranslation } from "react-i18next";

const SendMessage = () => {
  // const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    method: "",
    message: "",
  });

  const BOT_TOKEN = "8266378942:AAGYLpPRnn9g_n6QB6acyPNYTUIOa-QGIfM";
  const CHAT_ID = "-1002944437298"; // O'zingning Telegram ID

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = `
📩 Yangi xabar:
👤 Ism: ${formData.fullName}
📧 Email: ${formData.email}
📞 Telefon: ${formData.phone}
💬 Aloqa usuli: ${formData.method}
📝 Xabar: ${formData.message}
    `;

await fetch("https://khamsa-backend.onrender.com/notify/telegram", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text })
});

    alert("Xabaringiz yuborildi ✅");

    // Formani tozalash
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      method: "",
      message: "",
    });
    e.target.reset();
  };

  // 🔹 Barcha inputlar to‘ldirilganini tekshirish
  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.method.trim() !== "" &&
    formData.message.trim() !== "";

  return (
    <div className="sendmessage">
      <div className="container">
        <div className="sendmessage__box">
          <h2 className="sendmessage__title">Get in Touch</h2>
          <p className="sendmessage__text">Send us a message and we'll respond as soon as possible.</p>

          <form className="sendmessage-form" onSubmit={handleSubmit}>
            <div className="sendmessage__form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="sendmessage__form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="sendmessage__form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />
            </div>

            <div className="sendmessage__form-group">
              <label>Preferred Contact Method</label>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a contact method
                </option>
                <option value="telegram">Telegram</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
              <FaChevronDown className="select-icon" />
            </div>

            <div className="sendmessage__form">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describhe your inquiry in detail..."
                required
              />
              <div className="sendmessage__form-but">
                <button type="submit" disabled={!isFormValid}>
                  Send Message <LuSend />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
