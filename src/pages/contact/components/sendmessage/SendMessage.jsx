import React, { useState } from "react";
import "./sendmessage.scss";
import { LuSend } from "react-icons/lu";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const SendMessage = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    method: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = `
📩 ${t("send_new_message")}
👤 ${t("send_full_name")}: ${formData.fullName}
📧 ${t("send_email")}: ${formData.email}
📞 ${t("send_phone")}: ${formData.phone}
💬 ${t("send_method")}: ${formData.method}
📝 ${t("send_message_label")}: ${formData.message}
    `;

    await fetch("https://khamsa-backend.onrender.com/notify/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    alert(t("send_success"));

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      method: "",
      message: "",
    });
    e.target.reset();
  };

  const isFormValid =
    formData.fullName.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.method.trim() &&
    formData.message.trim();

  return (
    <div className="sendmessage">
      <div className="container">
        <div className="sendmessage__box">
          <h2 className="sendmessage__title">{t("send_title")}</h2>
          <p className="sendmessage__text">{t("send_subtitle")}</p>

          <form className="sendmessage-form" onSubmit={handleSubmit}>
            <div className="sendmessage__form-group">
              <label>{t("send_full_name")}</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t("send_full_name_placeholder")}
                required
              />
            </div>

            <div className="sendmessage__form-group">
              <label>{t("send_email")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("send_email_placeholder")}
                required
              />
            </div>

            <div className="sendmessage__form-group">
              <label>{t("send_phone")}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("send_phone_placeholder")}
                required
              />
            </div>

            <div className="sendmessage__form-group">
              <label>{t("send_method")}</label>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  {t("send_method_placeholder")}
                </option>
                <option value="telegram">{t("send_method_telegram")}</option>
                <option value="email">{t("send_method_email")}</option>
                <option value="whatsapp">{t("send_method_whatsapp")}</option>
              </select>
              <FaChevronDown className="select-icon" />
            </div>

            <div className="sendmessage__form">
              <label>{t("send_message_label")}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("send_message_placeholder")}
                required
              />

              <div className="sendmessage__form-but">
                <button type="submit" disabled={!isFormValid}>
                  {t("send_button")} <LuSend />
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
