import React, { useRef } from "react";
import Lottie from "react-lottie";
import * as animationData from "../../assets/logos/lf20_XElJDo.json";

import "./Logo.scss";

const Logo = props => {
  const animation = useRef(null);

  const defaultOptions = {
    loop: false,
    // autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const hoverOn = () => {
    animation.current.play();
  };

  return (
    <div
      className="mainStyleLogo"
      onClick={props.resetIndex}
      onMouseOver={hoverOn}
    >
      <Lottie
        options={defaultOptions}
        height={120}
        width={220}
        // isStopped={isStopped}
        ref={animation}
        // onMouseOver={setIsStopped(true)}
      />
    </div>
  );
};

export default Logo;

/* <img
onClick={props.resetIndex}
src={require("../../assets/logos/logo1.png")}
className={!props.mouseMoving ? "mainStyleLogo" : "mainStyleLogoAfter"}
alt=""
/> */
