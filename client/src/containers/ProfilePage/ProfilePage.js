import React from "react";
import { Switch } from "react-router-dom";

// Components
import PrivateRoute from "../../navigation/PrivateRoute";
import SideMenu from "../../components/ProfilePage/SideMenu/SideMenu";
import SideMenuMobileView from "../../components/ProfilePage/SideMenuMobileView/SideMenuMobileView";
import SavedVidsContainer from "../../components/ProfilePage/SavedVids/SavedVidsContainer";
import Categories from "../../components/ProfilePage/Categories/Categories";
import AccountSettings from "../../components/ProfilePage/AccountSettings/AccountSettings";
import "./ProfilePage.scss";

const ProfilePage = () => (
  <>
    <div className="profileHeaderBlock" />

    <SideMenuMobileView />
    <div className="profilePageContainer">
      <div className="sideMenuOuterContainer">
        <SideMenu />
      </div>
      <Switch>
        <PrivateRoute
          exact
          path="/:userId/profile"
          component={SavedVidsContainer}
        />
        <PrivateRoute
          exact
          path="/:userId/profile/categories"
          component={Categories}
        />
        <PrivateRoute
          exact
          path="/:userId/profile/settings"
          component={AccountSettings}
        />
      </Switch>
    </div>
  </>
);

export default ProfilePage;
