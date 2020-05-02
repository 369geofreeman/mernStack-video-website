import React from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "../containers/HomePage/HomePage";
import CategoriesOverlay from "../containers/CategoriesOverlay/CategoriesOverlay";
import CategoryPlayer from "../containers/CategoryPlayer/CategoryPlayer";
import ProfilePage from "../containers/ProfilePage/ProfilePage";
import SavedVidsSlider from "../components/ProfilePage/SavedVidsSliderModel/SavedVidsSlider";
import ToggleSignIn from "../components/LoginModal/RegisterForm/ToggleSignIn";
import Modal from "../components/LoginModal/Modal";
import PrivateRoute from "./PrivateRoute";
import PageLoadingLogo from "../layout/PageLoadingLogo";

const Navigation = ({
  isAuthenticated,
  videos: { loading, categoryLoading }
}) => {
  let location = useLocation();
  let background = location.state && location.state.background;

  let routes;

  if (isAuthenticated) {
    routes = (
      <div>
        <Switch location={location || background}>
          <Route
            exact
            path="/"
            component={loading === false ? HomePage : PageLoadingLogo}
          />
          <Route exact path="/:vidId" component={HomePage} />
          <Route
            path="/categories/:categoryId/:vidId"
            component={
              categoryLoading === false ? CategoryPlayer : PageLoadingLogo
            }
          />
          <PrivateRoute path="/:userId/profile" component={ProfilePage} />
          <PrivateRoute path="/saved/:vidId" component={SavedVidsSlider} />
          <Redirect to="/" />
        </Switch>
        {background && (
          <>
            <PrivateRoute exact path="/saved/:vidId" component={ProfilePage} />
            <Route exact path="/categories" component={CategoriesOverlay} />
          </>
        )}
      </div>
    );
  } else {
    routes = (
      <div>
        <Switch location={location || background}>
          <Route
            exact
            path="/"
            component={loading === false ? HomePage : PageLoadingLogo}
          />
          <Route exact path="/:vidId" component={HomePage} />
          <Route exact path="/auth" component={ToggleSignIn} />
          <Route
            path="/categories/:categoryId/:vidId"
            component={
              categoryLoading === false ? CategoryPlayer : PageLoadingLogo
            }
          />
          <Redirect to="/" />
        </Switch>
        {background && (
          <>
            <Route exact path="/auth" component={Modal} />
            <Route exact path="/categories" component={CategoriesOverlay} />
          </>
        )}
      </div>
    );
  }

  return routes;
};

//  Redux
const mapStateToProps = state => {
  return {
    isAuthenticated: state.Authenticate.isAuthenticated,
    videos: state.Videos
  };
};

export default connect(mapStateToProps)(Navigation);

// Bring in with:
//  categoryLoading === false ? CategoryPlayer : PageLoadingLogo
// Then access in mapStateToProps with categoryLoading: state.CategoryVideos.loading
// So as not to conflict with the other loading states
// Build out server and redux first
