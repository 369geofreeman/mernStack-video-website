import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

// my components
import ModalOpenBtn from "../../components/ModalOpenBtn/ModalOpenBtn";
import Logo from "../../components/Logo/Logo";
import LoggedInNav from "../../components/LoggedInNavState/LoggedInNav";
import LoggedOutNav from "../../components/LoggedInNavState/LoggedOutNav";
import "./Header.scss";
// Redux
import {
  mouseMoving,
  mouseNotMoving,
  currentIndex
} from "../../store/actions/Index";

const Header = props => {
  let location = useLocation();

  const setMouseMove = () => {
    props.onMouseMoving();
  };

  const resetIndex = () => {
    props.onResetCurrentIndex(0);
  };

  return (
    <div className="headerContainer">
      <Link to="/" className="headerLeftContainer">
        <Logo
          resetIndex={resetIndex}
          mouseMoving={props.mouseMoving}
          onMouseMove={() => setMouseMove()}
        />
        <div className="headerLeftTitlesContainer"></div>
      </Link>

      <div className="headerRightSideContainer">
        {props.isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        {location.pathname.match("/profile/categories") ? null : (
          <ModalOpenBtn moving={props.mouseMoving} />
        )}
      </div>
    </div>
  );
};

//  Redux mapping
const mapStateToProps = state => {
  return {
    mouseMoving: state.MouseMoving.mouseMoving,
    isLoggedIn: state.Authenticate.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMouseMoving: () => dispatch(mouseMoving()),
    onMouseNotMoving: () => dispatch(mouseNotMoving()),
    onResetCurrentIndex: index => dispatch(currentIndex(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
