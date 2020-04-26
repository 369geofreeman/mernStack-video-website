import React, { useState } from "react";

import RegisterForm from "./RegisterForm/RegisterForm";
import SignInForm from "./SignInForm/SignInForm";
import "./ToggleSignIn.scss";

const ToggleSignIn = () => {
  const [toggleSignIn, setToggleSignIn] = useState(true);

  const toggleSwitch = () => {
    setToggleSignIn(prevState => !prevState);
  };

  return (
    <div>
      <div className="toggleSignInContainer">
        {!toggleSignIn ? (
          <div onClick={toggleSwitch} className="toggleSignInBtns">
            Signin
          </div>
        ) : (
          <div className="toggleSignInBtnsAfter">Signin</div>
        )}
        {toggleSignIn ? (
          <div onClick={toggleSwitch} className="toggleSignInBtns">
            Signup
          </div>
        ) : (
          <div className="toggleSignInBtnsAfter">Signup</div>
        )}
      </div>
      {toggleSignIn ? <SignInForm /> : <RegisterForm />}
    </div>
  );
};

export default ToggleSignIn;
