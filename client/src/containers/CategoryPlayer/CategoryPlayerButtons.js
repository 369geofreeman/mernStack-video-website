import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Lottie from "react-lottie";
import * as animationData from "../../assets/logos/lf20_XElJDo.json";
// Components
import ModalOpenBtn from "../../components/ModalOpenBtn/ModalOpenBtn";
import LoggedInNav from "../../components/LoggedInNavState/LoggedInNav";
import LoggedOutNav from "../../components/LoggedInNavState/LoggedOutNav";
import "./CategoryPlayer.scss";
// Redux
import { currentIndex } from "../../store/actions/Index";

const CategoryPlayerButtons = props => {
  const defaultOptions = {
    loop: false,
    // autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const resetIndex = () => {
    props.onResetCurrentIndex(0);
  };

  return (
    <div>
      <div className="categoryPlayerLoggedInNavContainer">
        {props.isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        <ModalOpenBtn />
      </div>
      <Link
        to="/"
        className="userModalLogo"
        style={{ zIndex: 2000 }}
        onClick={resetIndex}
      >
        <Lottie options={defaultOptions} height={80} width={220} />
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
const mapStateToProps = state => {
  return {
    isLoggedIn: state.Authenticate.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onResetCurrentIndex: index => dispatch(currentIndex(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPlayerButtons);
