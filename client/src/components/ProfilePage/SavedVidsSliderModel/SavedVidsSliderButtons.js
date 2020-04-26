import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Lottie from "react-lottie";
import * as animationData from "../../../assets/logos/lf20_XElJDo.json";

import { userSavedIndex, currentIndex } from "../../../store/actions/Index";

import "./SavedVidsSliderModal.scss";

const SavedVidsSliderButtons = props => {
  const defaultOptions = {
    loop: false,
    // autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const resetIndex = () => {
    props.onResetUserSavedIndex(0);
    props.onCurrentIndex(0)
  };

  return (
    <div>
      <Link to="/" className="userModalLogo">
      <Lottie options={defaultOptions} height={80} width={220}  onClick={resetIndex}/>
      </Link>
      <Link className="userModalCloseContainer" to="/u1/profile">
        <img
          src={require("../../../assets/img/close.png")}
          alt=""
          className="userModalCloseBtn"
        />
      </Link>
      <Link
        onClick={props.previousIndex}
        to={props.from}
        style={{ textDecoration: "none" }}
        className="savedVidsArrowsRight"
      >
        {"<"}
      </Link>
      <Link
        onClick={props.nextIndex}
        to={props.to}
        style={{ textDecoration: "none" }}
        className="savedVidsArrowsLeft"
      >
        {">"}
      </Link>
    </div>
  );
};

// Redux
const mapDispatchToProps = dispatch => {
  return {
    onResetUserSavedIndex: index => dispatch(userSavedIndex(index)),
    onCurrentIndex: index => dispatch(currentIndex(index))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SavedVidsSliderButtons);
