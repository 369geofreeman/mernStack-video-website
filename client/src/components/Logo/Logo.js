import React, { useRef } from "react";
import Lottie from "react-lottie";
import * as animationData from "../../assets/logos/logo-animated.json";

import "./Logo.scss";

const Logo = ({ resetIndex }) => {
  const animation = useRef(null);

  const defaultOptions = {
    loop: false,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="mainStyleLogo" onClick={resetIndex}>
      <Lottie options={defaultOptions} ref={animation} />
    </div>
  );
};

export default Logo;
