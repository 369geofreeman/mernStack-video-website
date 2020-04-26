import React, { useState } from "react";
import { connect } from "react-redux";
// redux vars
import { logIn } from "../../../../store/actions/Index";
// Styles
import "./SignInForm.scss";

const SignInForm = props => {
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (!email) setEmailError("Please enter a valid email");
    console.log("Success!");
  };

  return (
    <div className="registerFormContainer">
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            className="registerFormEmail"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <div className="loginFormError">{emailError}</div>
        </div>
        <div>
          <input
            className="registerFormEmail"
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
            required
          />
          <div className="loginFormError">{emailError}</div>
        </div>
        <div className="formBtnContainer">
          <input type="submit" value="Login" className="submitBtn" />
        </div>
      </form>
    </div>
  );
};

//  Redux mapping
const mapDispatchToProps = dispatch => {
  return {
    onLogIn: () => dispatch(logIn())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignInForm);
