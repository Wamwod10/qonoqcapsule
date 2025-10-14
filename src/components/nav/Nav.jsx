// src/components/Nav.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./nav.scss";
import { useTranslation } from "react-i18next";

export default function Nav() {
  const { t, i18n } = useTranslation();

  const [active, setActive] = useState(0);
  const [openLang, setOpenLang] = useState(false);
  const [langTick, setLangTick] = useState(0); // <<< YANGI: til o‘zgarganini bildiruvchi flag

  const listRef = useRef(null);
  const pillRef = useRef(null);
  const langRef = useRef(null);

  // Languages (emoji+label)
  const LANGS = [
    { code: "en", label: "English", },
    { code: "ru", label: "Русский", },
    { code: "uz", label: "O'zbek", },
  ];
  const [lang, setLang] = useState(() => {
    const code = (i18n.language || "en").split("-")[0];
    return LANGS.find((l) => l.code === code) || LANGS[0];
  });

  // --- Pill’ni joyiga qo‘yish
  const movePill = (i) => {
    const wrap = listRef.current;
    const pill = pillRef.current;
    if (!wrap || !pill) return;

    const items = wrap.querySelectorAll(".nav__link");
    const el = items[i];
    if (!el) return;

    const wrapRect = wrap.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    pill.style.width = r.width + "px";
    pill.style.transform = `translateX(${r.left - wrapRect.left}px)`;
  };

  // Active o‘zgarsa: DOM tayyor bo‘lishini kutib keyin o‘lchaymiz
  useLayoutEffect(() => {
    let raf1 = 0,
      raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => movePill(active));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [active, langTick]); // <<< til flag ham trigger qiladi

  // Resize + til o‘zgarsa
  useEffect(() => {
    const onResize = () => movePill(active);
    window.addEventListener("resize", onResize);

    // Til o‘zgarganda hozircha o‘lchamasdan faqat flagni oshiramiz.
    const onLang = () => setLangTick((n) => n + 1);
    i18n.on("languageChanged", onLang);

    return () => {
      window.removeEventListener("resize", onResize);
      i18n.off("languageChanged", onLang);
    };
  }, [active, i18n]);

  // Matn kengligi/padding o‘zgarsa ham pill avtomatik moslashishi uchun
  useEffect(() => {
    if (!listRef.current) return;
    const ro = new ResizeObserver(() => {
      // keyingi kadrda o‘lchash – layout settle bo‘lsin
      requestAnimationFrame(() => movePill(active));
    });
    ro.observe(listRef.current);
    // har bir linkni ham kuzatsak yanada ishonchli bo‘ladi
    listRef.current
      .querySelectorAll(".nav__link")
      .forEach((el) => ro.observe(el));
    return () => ro.disconnect();
  }, [active, langTick]);

  // Tashqariga bosilganda lang dropdownni yopish
  useEffect(() => {
    const onDoc = (e) => {
      if (!langRef.current) return;
      if (!langRef.current.contains(e.target)) setOpenLang(false);
    };
    document.addEventListener("pointerdown", onDoc);
    return () => document.removeEventListener("pointerdown", onDoc);
  }, []);

  const onLangKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpenLang((v) => !v);
    }
    if (e.key === "Escape") setOpenLang(false);
  };

  const changeLang = (l) => {
    setLang(l);
    setOpenLang(false);
    i18n.changeLanguage(l.code); // localStorage ga yozadi
    // -> i18n 'languageChanged' event langTick ni oshiradi,
    // -> useLayoutEffect ikki marta rAF qilib yangi matn o‘lchamida pillni qo‘yadi.
  };

  return (
    <div className="nav">
      <div className="container">
        <div className="nav__box">
          {/* Logo */}
          <a href="/" className="nav__logo">
            {t("brand")}
          </a>

          {/* Main nav */}
          <ul
            className="nav__list"
            ref={listRef}
            role="tablist"
            aria-label="Main navigation"
          >
            <span className="nav__pill" ref={pillRef} aria-hidden="true" />

            <li className="nav__item" role="presentation">
              <button
                type="button"
                className={`nav__link ${active === 0 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 0}
                onClick={() => setActive(0)}
              >
                {t("home")}
              </button>
            </li>

            <li className="nav__item" role="presentation">
              <button
                type="button"
                className={`nav__link ${active === 1 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 1}
                onClick={() => setActive(1)}
              >
                {t("capsules")}
              </button>
            </li>

            <li className="nav__item" role="presentation">
              <button
                type="button"
                className={`nav__link ${active === 2 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 2}
                onClick={() => setActive(2)}
              >
                {t("services")}
              </button>
            </li>

            <li className="nav__item" role="presentation">
              <button
                type="button"
                className={`nav__link ${active === 3 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 3}
                onClick={() => setActive(3)}
              >
                {t("rules")}
              </button>
            </li>

            <li className="nav__item" role="presentation">
              <button
                type="button"
                className={`nav__link ${active === 4 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 4}
                onClick={() => setActive(4)}
              >
                {t("contact")}
              </button>
            </li>

            <li className="nav__item" role="presentation">
              <button
                type="button"
                className={`nav__link ${active === 5 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 5}
                onClick={() => setActive(5)}
              >
                {t("my_booking")}
              </button>
            </li>
          </ul>

          {/* Right side: language + CTA */}
          <div className="nav__last-box">
            {/* Language dropdown */}
            <div className="nav__lang" ref={langRef}>
              <button
                type="button"
                className={`nav__lang-toggle ${openLang ? "is-open" : ""}`}
                onClick={() => setOpenLang((v) => !v)}
                onKeyDown={onLangKey}
                aria-haspopup="listbox"
                aria-expanded={openLang}
                aria-label={t("change_lang")}
                title={t("change_lang")}
              >
                <span className="nav__lang-flag" aria-hidden="true">
                  {lang.flag}
                </span>
                <span className="nav__lang-text">{lang.label}</span>
                <span className="nav__chev" aria-hidden>
                  ▾
                </span>
              </button>

              <ul
                className={`nav__lang-menu ${openLang ? "show" : ""}`}
                role="listbox"
                tabIndex={-1}
              >
                {LANGS.map((l) => (
                  <li
                    key={l.code}
                    role="option"
                    aria-selected={lang.code === l.code}
                  >
                    <button
                      type="button"
                      className={`nav__lang-item ${
                        lang.code === l.code ? "is-active" : ""
                      }`}
                      onClick={() => changeLang(l)}
                    >
                      <div className="nav__lang-chip">
                        <span className="nav__lang-flag" aria-hidden="true">
                          {l.flag}
                        </span>
                        <span className="nav__lang-text">{l.label}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking CTA */}
            <div className="nav__booking-div">
              <a href="/" className="nav__booking">
                {t("contact_now")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
