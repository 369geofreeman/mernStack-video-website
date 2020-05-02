import React, { useRef } from "react";
import Lottie from "react-lottie";
import * as loadingLogo from "../assets/logos/page-loading.json";

const PageLoadingLogo = props => {
  const animation = useRef(null);

  const defaultOptions = {
    loop: true,
    animationData: loadingLogo.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div
      onClick={props.resetIndex}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        ref={animation}
      />
    </div>
  );
};

export default PageLoadingLogo;
