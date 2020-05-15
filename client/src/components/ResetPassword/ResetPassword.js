import React, { useState, useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Lottie from "react-lottie";
// Redux
import { setAlert } from "../../store/actions/Index";
// Comoponets
import Alert from "../../layout/Alert/Alert";
import * as loadingLogo from "../../assets/logos/page-loading.json";
import "./ResetPassword.css";

const ResetPassword = ({ match, setAlert }) => {
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    passwordMatch: "",
  });
  const { password, passwordMatch } = formData;
  const animation = useRef(null);

  const defaultOptions = {
    loop: true,
    animationData: loadingLogo.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setEmailLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password === passwordMatch) {
      let body = await JSON.stringify({
        password: password,
        token: match.params.token,
      });
      try {
        await axios.post("/api/auth/reset_password/:token", body, config);
        await setEmailLoading(false);
        setFormData({ ...formData, password: "", passwordMatch: "" });
        setAlert(`Password updated`, "success");
        setPasswordUpdated(true);
      } catch (err) {
        const errors = err.response.data.errors;
        await setEmailLoading(false);
        if (errors) {
          errors.forEach((error) => setAlert(error.msg, "danger"));
          await setEmailLoading(false);
        }
      }
      await setEmailLoading(false);
    } else {
      await setAlert(`Passwords do not match`, "danger");
      await setEmailLoading(false);
    }
    await setEmailLoading(false);
  };

  return (
    <div className="resetFormPageContainer">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="accountPasswordPageFormContainer"
      >
        {passwordUpdated ? (
          <>
            <Redirect to="/auth" />;
          </>
        ) : (
          <>
            {" "}
            <h2 className="passwordPageTitleText">
              Enter your new password below
            </h2>
            {emailLoading ? (
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                ref={animation}
              />
            ) : (
              <>
                <input
                  type="password"
                  title="Enter new password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  name="password"
                  className="accountPasswordPageFormInput"
                  placeholder="New Password"
                  minLength="6"
                />
                <input
                  type="password"
                  title="Re-enter new password"
                  value={passwordMatch}
                  onChange={(e) => onChange(e)}
                  name="passwordMatch"
                  className="accountPasswordPageFormInput"
                  placeholder="Re-enter New Password"
                  minLength="6"
                />
                <input
                  type="submit"
                  className="resetPasswordPageBtn"
                  value="Submit"
                />
                <Alert />
              </>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default connect(null, { setAlert })(ResetPassword);
