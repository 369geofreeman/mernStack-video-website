import React, { useState } from "react";
import { connect } from "react-redux";

// Components
import Spinner from "../../../layout/Spinner";
import "./AccountSettings.scss";

// To Delete a profile bring in deleteAccount from actions/Index and wire that bitch up

const AccountSettings = ({ auth: { user, loading } }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);

  return loading && user === null ? (
    <Spinner />
  ) : (
    <div className="accountSettingsContainer">
      <img
        src={require("../../../assets/img/Hooks.png")}
        alt=""
        className="AccountHeaderImg"
      />
      <h1 className="accountUserEmail">Welcome {user && user.name}</h1>
      <div className="acountTitle">
        <div className="accountTitleContainer">
          <h2 className="accountSavedVidsText">Collection:</h2>
          <h2 className="accountSavedVidsTextRes">
            {user && user.savedVids.length} Clips
          </h2>
        </div>
        <div className="accountTitleContainer">
          <h2 className="accountSavedVidsText">Member since:</h2>
          <h2 className="accountSavedVidsTextRes">{user && user.date}</h2>
        </div>
      </div>
      <div className="accountChangeCredentualsContainer">
        <div className="accountChangePasswordContainer">
          {showChangePassword ? (
            <>
              <div className="accountFormChangeTitleContainer">
                <h2
                  className="accountFormChangeTitleClose"
                  onClick={() => setShowChangePassword(!showChangePassword)}
                >
                  x
                </h2>
                <h2 className="accountFormChangeTitle">Change Password</h2>
              </div>
              <form className="accountPasswordFormContainer">
                <input
                  type="password"
                  title="Enter current password"
                  className="accountPasswordFormInput"
                  placeholder="Current Password"
                />
                <input
                  type="password"
                  title="Enter new password"
                  className="accountPasswordFormInput"
                  placeholder="New Password"
                />
                <input
                  type="password"
                  title="Re-enter new password"
                  className="accountPasswordFormInput"
                  placeholder="Re-enter New Password"
                />
                <button className="accountChangeBtn">Submit</button>
              </form>
            </>
          ) : (
            <button
              className="accountChangeBtn"
              onClick={() => setShowChangePassword(!showChangePassword)}
            >
              Change Password
            </button>
          )}
        </div>

        <div className="accountChangePasswordContainer">
          {changeEmail ? (
            <>
              <div className="accountFormChangeTitleContainer">
                <h2
                  className="accountFormChangeTitleClose"
                  onClick={() => setChangeEmail(!changeEmail)}
                >
                  x
                </h2>
                <h2 className="accountFormChangeTitle">Change Email</h2>
              </div>
              <form className="accountPasswordFormContainer">
                <input
                  type="email"
                  title="Enter new email"
                  className="accountPasswordFormInput"
                  placeholder="Current Email"
                />
                <input
                  type="email"
                  title="Re-enter new email"
                  className="accountPasswordFormInput"
                  placeholder="New Email"
                />
                <button className="accountChangeBtn">Submit</button>
              </form>
            </>
          ) : (
            <button
              className="accountChangeBtn"
              onClick={() => setChangeEmail(true)}
            >
              Change Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.Authenticate,
  profile: state.Profile
});

export default connect(mapStateToProps)(AccountSettings);
