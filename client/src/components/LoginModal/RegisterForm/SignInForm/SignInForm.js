import React, { useState, useRef } from "react";
import axios from "axios";
import Lottie from "react-lottie";
import { connect } from "react-redux";
// redux
import { login, setAlert } from "../../../../store/actions/Index";
// components
import Alert from "../../../../layout/Alert/Alert";
import * as loadingLogo from "../../../../assets/logos/page-loading.json";
import "./SignInForm.scss";

const SignInForm = ({ login, setAlert, showChangePassword, user }) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    forgottenEmail: "",
  });
  const [passwordResetForm, setPasswordResetForm] = useState(false);
  const animation = useRef(null);

  const defaultOptions = {
    loop: true,
    animationData: loadingLogo.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { email, password, forgottenEmail } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    await setEmailLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let body = await JSON.stringify({ email: forgottenEmail });
    try {
      await axios.post("/api/auth/forgot_password", body, config);
      setAlert(`Email sent to: ${forgottenEmail}`, "success");
      setFormData({ ...formData, forgottenEmail: "" });
      await setEmailLoading(false);
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert(error.msg, "danger"));
        await setEmailLoading(false);
      }
    }
  };

  return (
    <div className="registerFormContainer">
      {!passwordResetForm ? (
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              className="registerFormEmail"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div>
            <input
              className="registerFormEmail"
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
            {showChangePassword ? (
              <div
                onClick={() => setPasswordResetForm(!passwordResetForm)}
                className="forgotPasswordText"
              >
                Forgot your password?
              </div>
            ) : (
              <></>
            )}
            <Alert />
          </div>
          <div className="formBtnContainer">
            <input type="submit" value="Login" className="submitBtn" />
          </div>
        </form>
      ) : (
        <div>
          <form onSubmit={(e) => handlePasswordReset(e)}>
            {emailLoading ? (
              <Lottie
                options={defaultOptions}
                height={250}
                width={250}
                ref={animation}
              />
            ) : (
              <>
                {" "}
                <input
                  className="registerFormEmail"
                  type="email"
                  placeholder="Email"
                  name="forgottenEmail"
                  value={forgottenEmail}
                  onChange={(e) => onChange(e)}
                  required
                />
                <div
                  onClick={() => setPasswordResetForm(!passwordResetForm)}
                  className="forgotPasswordText"
                >
                  Back to sign in
                </div>
                <Alert />
                <div className="formBtnContainer">
                  <input
                    type="submit"
                    value="Reset Password"
                    className="submitBtn"
                  />
                </div>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

//  Redux
const mapStateToProps = (state) => {
  return {
    user: state.Authenticate.user,
  };
};

export default connect(mapStateToProps, { login, setAlert })(SignInForm);
