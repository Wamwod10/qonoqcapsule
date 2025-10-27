import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./nav.scss";
import { IoHome } from "react-icons/io5";
import { TbBedFilled } from "react-icons/tb";
import { TbHelpHexagon } from "react-icons/tb";
import { BsFillBookmarksFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { PiNotebook } from "react-icons/pi";

export default function Nav() {
  const { t, i18n } = useTranslation();

  const [active, setActive] = useState(0);
  const [openLang, setOpenLang] = useState(false);
  const [langTick, setLangTick] = useState(0);

  const listRef = useRef(null);
  const pillRef = useRef(null);
  const langRef = useRef(null);

  // Languages (emoji+label)
  const LANGS = [
    { code: "en", label: "English" },
    { code: "ru", label: "Русский" },
    { code: "uz", label: "O'zbek" },
  ];
  const [lang, setLang] = useState(() => {
    const code = (i18n.language || "en").split("-")[0];
    return LANGS.find((l) => l.code === code) || LANGS[0];
  });

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
    i18n.changeLanguage(l.code);
  };

  return (
    <div className="nav">
      <div className="container">
        <div className="nav__box">
          <a href="/" className="nav__logo">
            {/* {t("brand")} */}
            <img src="/public/6.png" alt="" />
          </a>

          <ul
            className="nav__list"
            ref={listRef}
            role="tablist"
            aria-label="Main navigation"
          >
            <span className="nav__pill" ref={pillRef} aria-hidden="true" />

            <li className="nav__item" role="presentation">
              <a
                href="#"
                className={`nav__link ${active === 0 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 0}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(0);
                }}
              >
                <IoHome className="nav__icon" /> {t("home")}
              </a>
            </li>

            <li className="nav__item" role="presentation">
              <a
                href="#"
                className={`nav__link ${active === 1 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 1}
                onClick={() => setActive(1)}
              >
                <TbBedFilled /> {t("capsules")}
              </a>
            </li>

            <li className="nav__item" role="presentation">
              <a
                href="#"
                className={`nav__link ${active === 2 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 2}
                onClick={() => setActive(2)}
              >
                <TbHelpHexagon /> {t("services")}
              </a>
            </li>

            <li className="nav__item" role="presentation">
              <a
                href="#"
                className={`nav__link ${active === 3 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 3}
                onClick={() => setActive(3)}
              >
                <BsFillBookmarksFill /> {t("rules")}
              </a>
            </li>

            <li className="nav__item" role="presentation">
              <a
                href="#"
                className={`nav__link ${active === 4 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 4}
                onClick={() => setActive(4)}
              >
                <IoCall />
                {t("contact")}
              </a>
            </li>

            <li className="nav__item" role="presentation">
              <a
                href="#"
                className={`nav__link ${active === 5 ? "is-active" : ""}`}
                role="tab"
                aria-selected={active === 5}
                onClick={() => setActive(5)}
              >
                <PiNotebook />
                {t("my_booking")}
              </a>
            </li>
          </ul>

          <div className="nav__last-box">
            <div className="nav__lang" ref={langRef}>
              <a
                href="#"
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
              </a>

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
                    <a
                      href="#"
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
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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
