import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiHelpCircle } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import "./faqaccordion.scss";

const FaqAccordion = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: t("faq_q1"),
      answer: t("faq_a1"),
    },
    {
      question: t("faq_q2"),
      answer: t("faq_a2"),
    },
    {
      question: t("faq_q3"),
      answer: t("faq_a3"),
    },
    {
      question: t("faq_q4"),
      answer: t("faq_a4"),
    },
    {
      question: t("faq_q5"),
      answer: t("faq_a5"),
    },
    {
      question: t("faq_q6"),
      answer: t("faq_a6"),
    },
    {
      question: t("faq_q7"),
      answer: t("faq_a7"),
    },
    {
      question: t("faq_q8"),
      answer: t("faq_a8"),
    },
  ];

  return (
    <section className="faq" aria-label={t("faq_title")}>
      <h2 className="faq__title">{t("faq_title")}</h2>
      <p className="faq__subtitle">{t("faq_subtitle")}</p>

      <div className="faq__wrapper container">
        <div className="faq__list">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq__item ${isOpen ? "faq__item--open" : ""}`}
              >
                <button
                  className="faq__question"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span>{item.question}</span>
                  <span className="faq__icon" aria-hidden="true">
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className="faq__answer"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className="faq__help-box"
          role="region"
          aria-label={t("faq_help_title")}
        >
          <FiHelpCircle className="faq__help-icon" aria-hidden="true" />
          <div className="faq__help-text">
            <strong>{t("faq_help_heading")}</strong>
            <p>{t("faq_help_text")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;
