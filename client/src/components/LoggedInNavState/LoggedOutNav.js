import React from "react";
import { Link, useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";
// Img
import clipped from "../../assets/img/unClipped.png";

const LoggedOutNav = props => {
  let location = useLocation();
  return (
    <Link
      data-tip
      data-for="clipTip"
      to={{ pathname: "/auth", state: { background: location } }}
      className="loginText"
    >
      <img src={clipped} alt="" className="clippedHeartLoggedOut" />
      <ReactTooltip
        id="clipTip"
        place="bottom"
        effect="solid"
        delayHide={100}
        delayShow={300}
        border
        multiline={false}
      >
        Clip your favorites.
      </ReactTooltip>
    </Link>
  );
};

export default LoggedOutNav;
