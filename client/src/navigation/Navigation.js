import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "../containers/HomePage/HomePage";
import SearchModal from "../containers/SearchModal/SearchModal";
import CategoryPlayer from "../containers/CategoryPlayer/CategoryPlayer";
import ProfilePage from "../containers/ProfilePage/ProfilePage";
import SavedVidsSlider from "../components/ProfilePage/SavedVidsSliderModel/SavedVidsSlider";
import ToggleSignIn from "../components/LoginModal/RegisterForm/ToggleSignIn";
import Modal from "../components/LoginModal/Modal";
import PrivateRoute from "./PrivateRoute";
import PageLoadingLogo from "../layout/PageLoadingLogo";
import ResetPassword from "../components/ResetPassword/ResetPassword";

import {
  categoryTitle,
  currentCategoryIndex,
  getCategoryVideos,
  resetCategoryVideos
} from "../store/actions/Index";

const Navigation = ({
  isAuthenticated: { isAuthenticated, user },
  videos: { loading, categoryLoading, categoryVideos }
}) => {
  let location = useLocation();
  let background = location.state && location.state.background;
  // const [savedVideos, setSavedVideos] = useState([]);

  // Start - Turn this into action to set category videos if not set

  // useEffect(() => {
  //   const category = location.pathname.match("/categories/")
  //     ? location.pathname.split("/")[2]
  //     : "";
  //   const categoryTag = [...category].filter(y => y !== "_").join("");
  //   if (categoryVideos.length === 0) {
  //     // return categoryTitle(category);
  //     getCategoryVideos(categoryTag);
  //   }
  // }, [categoryVideos.length, location.pathname]);

  // End

  // useEffect(() => {
  //   if (user) setSavedVideos(user.savedVids);
  // }, [setSavedVideos, user]);

  let routes;

  if (isAuthenticated) {
    routes = (
      <div>
        <Switch
          location={location.pathname.match("/saved") ? location : background}
        >
          <Route
            exact
            path="/"
            component={loading === false ? HomePage : PageLoadingLogo}
          />
          <Route exact path="/play/:vidId" component={HomePage} />
          <Route
            exact
            path="/categories/:categoryId/:vidId"
            component={
              categoryLoading === false ? CategoryPlayer : PageLoadingLogo
            }
          />
          <PrivateRoute path="/:userId/profile" component={ProfilePage} />
          <PrivateRoute
            exact
            path="/saved/:vidId"
            component={SavedVidsSlider}
          />

          <Route component={loading === false ? HomePage : PageLoadingLogo} />
        </Switch>
        {background && (
          <>
            <PrivateRoute exact path="/saved/:vidId" component={ProfilePage} />
            <Route exact path="/categories" component={SearchModal} />
          </>
        )}
      </div>
    );
  } else {
    routes = (
      <div>
        <Switch location={background}>
          <Route
            exact
            path="/"
            component={loading === false ? HomePage : PageLoadingLogo}
          />
          <Route exact path="/play/:vidId" component={HomePage} />
          <Route exact path="/auth" component={ToggleSignIn} />
          <Route
            exact
            path="/categories/:categoryId/:vidId"
            component={
              categoryLoading === false ? CategoryPlayer : PageLoadingLogo
            }
          />
          <Route
            exact
            path="/reset_password/:token"
            component={ResetPassword}
          />
          <Route component={loading === false ? HomePage : PageLoadingLogo} />
        </Switch>
        {background && (
          <>
            <Route exact path="/auth" component={Modal} />
            <Route exact path="/categories" component={SearchModal} />
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
    isAuthenticated: state.Authenticate,
    videos: state.Videos
  };
};

export default connect(
  mapStateToProps,
  {
    categoryTitle,
    currentCategoryIndex,
    getCategoryVideos,
    resetCategoryVideos
  }
)(Navigation);
