import React from "react";
import { Switch, Route } from "react-router-dom";

import { DUMMY_DATA_SFW as vids } from "../../assets/dummyData/videos";
// My Components
import SideMenu from "../../components/ProfilePage/SideMenu/SideMenu";
import SavedVidsContainer from "../../components/ProfilePage/SavedVids/SavedVidsContainer";
import Categories from "../../components/ProfilePage/Categories/Categories";
import AccountSettings from "../../components/ProfilePage/AccountSettings/AccountSettings";
import "./ProfilePage.scss";

const ProfilePage = () => {
  if (vids.length === 0) {
    return (
      <div className="profilePageContainer">
        <SideMenu />
        <div className="profilePagetext">Save vids to build a collection</div>
      </div>
    );
  }
  return (
    <div className="profilePageContainer">
      <div className="sideMenuOuterContainer">
        <SideMenu />
      </div>
      <Switch>
        <Route exact path="/:userId/profile" component={SavedVidsContainer} />
        <Route
          exact
          path="/:userId/profile/categories"
          component={Categories}
        />
        <Route
          exact
          path="/:userId/profile/settings"
          component={AccountSettings}
        />
      </Switch>
    </div>
  );
};

export default ProfilePage;
