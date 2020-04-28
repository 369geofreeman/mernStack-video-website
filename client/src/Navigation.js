import React from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./containers/HomePage/HomePage";
import CategoriesOverlay from "./containers/CategoriesOverlay/CategoriesOverlay";
import CategoryPlayer from "./containers/CategoryPlayer/CategoryPlayer";
import ProfilePage from "./containers/ProfilePage/ProfilePage";
import SavedVidsSlider from "./components/ProfilePage/SavedVidsSliderModel/SavedVidsSlider";
import ToggleSignIn from "./components/LoginModal/RegisterForm/ToggleSignIn";
import Modal from "./components/LoginModal/Modal";

const Navigation = ({ isAuthenticated }) => {
  let location = useLocation();
  let background = location.state && location.state.background;

  let routes;

  if (isAuthenticated) {
    routes = (
      <div>
        <Switch location={location || background}>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/:vidId" exact>
            <HomePage />
          </Route>
          <Route path="/categories/:categoryId/:vidId" exact>
            <CategoryPlayer />
          </Route>
          <Route path="/:userId/profile">
            <ProfilePage />
          </Route>
          <Route path="/saved/:vidId" exact>
            <SavedVidsSlider />
          </Route>
          <Redirect to="/" />
        </Switch>
        {background && (
          <>
            <Route path="/saved/:vidId">
              <ProfilePage />
            </Route>
            <Route path="/categories" exact>
              <CategoriesOverlay />
            </Route>
          </>
        )}
      </div>
    );
  } else {
    routes = (
      <div>
        <Switch location={background || location}>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/:vidId/" exact>
            <HomePage />
          </Route>
          <Route path="/auth">
            <ToggleSignIn />
          </Route>
          <Route path="/categories/:categoryId/:vidId" exact>
            <CategoryPlayer />
          </Route>
          <Redirect to="/" />
        </Switch>
        {background && (
          <>
            <Route path="/auth">
              <Modal />
            </Route>
            <Route path="/categories">
              <CategoriesOverlay />
            </Route>
          </>
        )}
      </div>
    );
  }

  return routes;
};

//  Redux mapping
const mapStateToProps = state => {
  return {
    isAuthenticated: state.Authenticate.isAuthenticated
  };
};

export default connect(mapStateToProps)(Navigation);
