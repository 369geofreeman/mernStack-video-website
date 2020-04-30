import React, { useRef } from "react";
import Lottie from "react-lottie";
import * as animationData from "../../assets/logos/lf20_XElJDo.json";

import "./Logo.scss";

const Logo = props => {
  const animation = useRef(null);

  const defaultOptions = {
    loop: false,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="mainStyleLogo" onClick={props.resetIndex}>
      <Lottie
        options={defaultOptions}
        height={120}
        width={220}
        ref={animation}
      />
    </div>
  );
};

export default Logo;
