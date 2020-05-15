import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// Components
import ModalOpenBtn from "../../layout/ModalOpenBtn/ModalOpenBtn";
import Logo from "../../components/Logo/Logo";
import LoggedInNav from "../../components/LoggedInNavState/LoggedInNav";
import LoggedOutNav from "../../components/LoggedInNavState/LoggedOutNav";
import "./Header.scss";
// Redux
import { currentIndex } from "../../store/actions/Index";

const Header = ({ isLoggedIn, onResetCurrentIndex }) => {
  let location = useLocation();

  const resetIndex = () => {
    onResetCurrentIndex(0);
  };

  return (
    <div className="headerContainer">
      <Link to="/" className="headerLeftContainer">
        <Logo resetIndex={resetIndex} />
        <div className="headerLeftTitlesContainer"></div>
      </Link>

      <div className="headerRightSideContainer">
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
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
