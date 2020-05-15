import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Moment from "react-moment";
// Redux
import { deleteAccount, setAlert, logout } from "../../../store/actions/Index";
// Components
import PageLoadingLogo from "../../../layout/PageLoadingLogo";
import "./AccountSettings.scss";

// To Delete a profile bring in deleteAccount from actions/Index and wire that bitch up

const AccountSettings = ({
  auth: { user, loading },
  deleteAccount,
  setAlert,
  logout,
}) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordUpdateLoading, setPasswordUpdateLoading] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    await setPasswordUpdateLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let body = await JSON.stringify({ email: user.email });
    try {
      await axios.post("/api/auth/forgot_password", body, config);
      await setAlert(`Email sent to: ${user.email}`, "success");
      await setPasswordUpdateLoading(false);
      logout();
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert(error.msg, "danger"));
        await setPasswordUpdateLoading(false);
      }
    }
  };

  return loading && user === null ? (
    <PageLoadingLogo />
  ) : (
    <div className="accountSettingsContainer">
      <div className="accountImgContainer">
        <img
          src={require("../../../assets/img/Hooks.png")}
          alt=""
          className="AccountHeaderImg"
        />
      </div>
      <h1 className="accountUserEmail">Welcome {user && user.name}</h1>
      <div className="accountBodyContainer">
        <div className="acountTitle">
          <div className="accountTitleContainer">
            <h2 className="accountSavedVidsText">Collection:</h2>
            <h2 className="accountSavedVidsTextRes">
              {user && user.savedVids.length === 1
                ? `${user.savedVids.length} Clip`
                : `${user.savedVids.length} Clips`}
            </h2>
          </div>
          <div className="accountTitleContainer">
            <h2 className="accountSavedVidsText">Member since:</h2>
            <h2 className="accountSavedVidsTextRes">
              <Moment format="DD/MM/YYYY">{user.date}</Moment>
            </h2>
          </div>
        </div>
        <div className="accountChangePasswordContainer">
          {showChangePassword ? (
            <>
              <div className="openFormAccountContainer">
                {passwordUpdateLoading ? (
                  <PageLoadingLogo />
                ) : (
                  <>
                    <p className="updatePasswordText">
                      Click the link below to update your password.
                    </p>
                    <p className="updatePasswordText">
                      An email will be sent for you to log in with your new
                      password
                    </p>
                    <p className="updatePasswordText">
                      You will be logged out after clicking this link
                    </p>
                    <div
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 20,
                      }}
                    >
                      <button
                        className="accountChangeBtn"
                        onClick={(e) =>
                          window.confirm(
                            "Are you sure you wish update your password?"
                          ) && handleUpdatePassword(e)
                        }
                      >
                        Submit
                      </button>
                      <button
                        className="accountChangeBtn"
                        onClick={() =>
                          setShowChangePassword(!showChangePassword)
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
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
        <button
          className="deleteAccountBtn"
          disabled={showChangePassword}
          onClick={() => deleteAccount()}
        >
          Delete account
        </button>
        <div className="accountSpacer" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Authenticate,
  profile: state.Profile,
});

export default connect(mapStateToProps, { deleteAccount, setAlert, logout })(
  AccountSettings
);

// import React, { useState } from "react";
// import { connect } from "react-redux";
// import Moment from "react-moment";
// // Redux
// import { deleteAccount } from "../../../store/actions/Index";
// // Components
// import Spinner from "../../../layout/Spinner";
// import "./AccountSettings.scss";

// // To Delete a profile bring in deleteAccount from actions/Index and wire that bitch up

// const AccountSettings = ({ auth: { user, loading }, deleteAccount }) => {
//   const [showChangePassword, setShowChangePassword] = useState(false);

//   return loading && user === null ? (
//     <Spinner />
//   ) : (
//     <div className="accountSettingsContainer">
//       <div className="accountImgContainer">
//         <img
//           src={require("../../../assets/img/Hooks.png")}
//           alt=""
//           className="AccountHeaderImg"
//         />
//       </div>
//       <h1 className="accountUserEmail">Welcome {user && user.name}</h1>
//       <div className="accountBodyContainer">
//         <div className="acountTitle">
//           <div className="accountTitleContainer">
//             <h2 className="accountSavedVidsText">Collection:</h2>
//             <h2 className="accountSavedVidsTextRes">
//               {user && user.savedVids.length === 1
//                 ? `${user.savedVids.length} Clip`
//                 : `${user.savedVids.length} Clips`}
//             </h2>
//           </div>
//           <div className="accountTitleContainer">
//             <h2 className="accountSavedVidsText">Member since:</h2>
//             <h2 className="accountSavedVidsTextRes">
//               <Moment format="DD/MM/YYYY">{user.date}</Moment>
//             </h2>
//           </div>
//         </div>
//         <div className="accountChangePasswordContainer">
//           {showChangePassword ? (
//             <>
//               <div className="openFormAccountContainer">
//                 <form className="accountPasswordFormContainer">
//                   <input
//                     type="password"
//                     title="Enter current password"
//                     className="accountPasswordFormInput"
//                     placeholder="Current Password"
//                   />
//                   <input
//                     type="password"
//                     title="Enter new password"
//                     className="accountPasswordFormInput"
//                     placeholder="New Password"
//                   />
//                   <input
//                     type="password"
//                     title="Re-enter new password"
//                     className="accountPasswordFormInput"
//                     placeholder="Re-enter New Password"
//                   />
//                   <div
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <button className="accountChangeBtn">Submit</button>
//                     <button
//                       className="accountChangeBtn"
//                       onClick={() => setShowChangePassword(!showChangePassword)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                   <div className="accountSpacer" />
//                 </form>
//               </div>
//             </>
//           ) : (
//             <button
//               className="accountChangeBtn"
//               onClick={() => setShowChangePassword(!showChangePassword)}
//             >
//               Change Password
//             </button>
//           )}
//         </div>
//         <button
//           className="deleteAccountBtn"
//           disabled={showChangePassword}
//           onClick={() => deleteAccount()}
//         >
//           Delete account
//         </button>
//         <div className="accountSpacer" />
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   auth: state.Authenticate,
//   profile: state.Profile,
// });

// export default connect(mapStateToProps, { deleteAccount })(AccountSettings);
