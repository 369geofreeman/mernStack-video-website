import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Lottie from "react-lottie";
import * as animationData from "../../assets/logos/logo-animated.json";
// Components
import ModalOpenBtn from "../../layout/ModalOpenBtn/ModalOpenBtn";
import LoggedInNav from "../../components/LoggedInNavState/LoggedInNav";
import LoggedOutNav from "../../components/LoggedInNavState/LoggedOutNav";
import "./CategoryPlayer.scss";
// Redux
import { currentIndex } from "../../store/actions/Index";

const CategoryPlayerButtons = ({
  onResetCurrentIndex,
  isLoggedIn,
  previousIndex,
  from,
  nextIndex,
  to,
}) => {
  const defaultOptions = {
    loop: false,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const resetIndex = () => {
    onResetCurrentIndex(0);
  };

  return (
    <div>
      <div className="categoryPlayerLoggedInNavContainer">
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        <ModalOpenBtn />
      </div>
      <Link
        to="/"
        className="userModalLogo"
        style={{ zIndex: 2000 }}
        onClick={resetIndex}
      >
        <Lottie options={defaultOptions} />
      </Link>
      <Link
        onClick={previousIndex}
        to={from}
        style={{ textDecoration: "none" }}
        className="savedVidsArrowsRight"
      >
        {"<"}
      </Link>
      <Link
        onClick={nextIndex}
        to={to}
        style={{ textDecoration: "none" }}
        className="savedVidsArrowsLeft"
      >
        {">"}
      </Link>
    </div>
  );
};

// Redux
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.Authenticate.isAuthenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onResetCurrentIndex: (index) => dispatch(currentIndex(index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPlayerButtons);
