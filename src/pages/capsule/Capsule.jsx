import React from "react";
import "./capsule.scss";
import CapsuleHeader from "./components/capsuleheader/CapsuleHeader";
import Capstype from "./components/capstype/Capstype";

const Capsule = () => {
  return (
    <div>
      <CapsuleHeader />
      <Capstype />
    </div>
  );
};

export default Capsule;
