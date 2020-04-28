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
import { currentIndex } from "../../store/actions/Index";

const Header = props => {
  let location = useLocation();

  const resetIndex = () => {
    props.onResetCurrentIndex(0);
  };

  return (
    <div className="headerContainer">
      <Link to="/" className="headerLeftContainer">
        <Logo resetIndex={resetIndex} />
        <div className="headerLeftTitlesContainer"></div>
      </Link>

      <div className="headerRightSideContainer">
        {props.isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        {location.pathname.match("/profile/categories") ? null : (
          <ModalOpenBtn />
        )}
      </div>
    </div>
  );
};

//  Redux
const mapStateToProps = state => ({
  isLoggedIn: state.Authenticate.isAuthenticated
});

const mapDispatchToProps = dispatch => {
  return {
    onResetCurrentIndex: index => dispatch(currentIndex(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
