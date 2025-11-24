import React from "react";
import "./gallery.scss";

import img12 from "/public/12.jpg";
import img13 from "/public/13.jpg";
import img14 from "/public/14.jpg";
import img15 from "/public/15.jpg";
import img16 from "/public/16.jpg";
import img17 from "/public/17.jpg";
import img18 from "/public/18.jpg";

import img19 from "/public/19.jpg";
import img20 from "/public/20.jpg";
import img21 from "/public/21.jpg";
import img22 from "/public/22.jpg";
import img23 from "/public/23.jpg";
import img24 from "/public/24.jpg";
import img25 from "/public/25.jpg";

const topImages = [img12, img13, img14, img15, img16, img17, img18];
const bottomImages = [img19, img20, img21, img22, img23, img24, img25];

const Gallery = () => {
  return (
    <div className="gallery">
      <div className="container">
        <h2 className="qonoq__title">Gallery — Our space, Our team</h2>

        <div className="gallery__box">
          {/* Fade shadowlar */}
          <div className="gallery__fade gallery__fade--left" />
          <div className="gallery__fade gallery__fade--right" />

          {/* 1-qator (12–18) o‘ngdan chapga yuradi */}
          <div className="gallery__row gallery__row--top">
            <div className="gallery__track">
              {[...topImages, ...topImages].map((src, index) => (
                <div className="gallery__item" key={`top-${index}`}>
                  <div className="gallery__card">
                    <img src={src} alt={`Qonoq capsule ${index + 1}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2-qator (19–25) chapdan o‘ngga yuradi */}
          <div className="gallery__row gallery__row--bottom">
            <div className="gallery__track">
              {[...bottomImages, ...bottomImages].map((src, index) => (
                <div className="gallery__item" key={`bottom-${index}`}>
                  <div className="gallery__card">
                    <img src={src} alt={`Qonoq team ${index + 1}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
