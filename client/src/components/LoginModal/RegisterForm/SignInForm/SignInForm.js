import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// redux vars
import { login } from "../../../../store/actions/Index";
// components
import Alert from "../../../Alert/Alert";
// Styles
import "./SignInForm.scss";

const SignInForm = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  console.log(isAuthenticated);

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
          <Alert />
        </div>
        <div className="formBtnContainer">
          <input type="submit" value="Login" className="submitBtn" />
        </div>
      </form>
    </div>
  );
};

//  Redux
const mapStateToProps = state => {
  return {
    isAuthenticated: state.Authenticate.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { login }
)(SignInForm);
