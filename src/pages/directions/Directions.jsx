import React from "react";
import { useTranslation } from "react-i18next";
import "./directions.scss";

const steps = ["/44.jpg", "/45.jpg", "/46.jpg", "/47.jpg"];

const Directions = () => {
  const { t } = useTranslation();

  return (
    <main className="directions">
      <div className="container">
        <header className="directions__header">
          <h1 className="directions__title">{t("directions_title")}</h1>
          <p className="directions__subtitle">{t("directions_subtitle")}</p>
        </header>

        <div className="directions__steps">
          {steps.map((image, index) => (
            <section className="directions__step" key={image}>
              <h2 className="directions__step-label">
                {t("directions_step", { number: index + 1 })}
              </h2>
              <img
                className="directions__image"
                src={image}
                alt={t("directions_image_alt", { number: index + 1 })}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Directions;
