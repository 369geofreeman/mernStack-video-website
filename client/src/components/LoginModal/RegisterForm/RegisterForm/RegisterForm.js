import React, { useState } from "react";
import { connect } from "react-redux";
// Redux
import { register, createProfile } from "../../../../store/actions/Index";
// Components
import Alert from "../../../Alert/Alert";
import "./RegisterForm.scss";

const RegisterForm = ({ register }) => {
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    savedVids: []
  });

  const { name, email, password, password2, savedVids } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setEmailError("Passwords do not match");
    } else {
      register({ name, email, password, savedVids });
    }
  };

  return (
    <div className="registerFormContainer">
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            required
            className="registerFormEmail"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            className="registerFormEmail"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength={6}
            className="registerFormEmail"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength={6}
            className="registerFormEmail"
            value={password2}
            onChange={e => onChange(e)}
          />
          <Alert className="loginFormError" />
          <div className="loginFormError">{emailError}</div>
        </div>
        <div className="formBtnContainer">
          <input type="submit" className="submitBtn" value="Lets go" />
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
  { register, createProfile }
)(RegisterForm);
