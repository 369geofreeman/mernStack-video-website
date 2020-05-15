import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
// Img
import clipped from "../../assets/img/unClipped.png";
import { modalOpen } from "../../store/actions/Index";

const LoggedOutNav = ({ modalOpen }) => {
  let location = useLocation();
  return (
    <Link
      data-tip
      data-for="clipTip"
      onClick={() => modalOpen()}
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

export default connect(
  null,
  { modalOpen }
)(LoggedOutNav);
