import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import ToggleSignIn from "./RegisterForm/ToggleSignIn";
import OnBoarding from "./OnBoarding/OnBoarding";
import "./Modal.scss";

function Modal() {
  const [modalOpen, setModalOpen] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setModalOpen(true);
  }, [modalOpen]);

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div>
      <div onClick={back} className="registerModalBackground" />
      <div className={modalOpen ? "registerModalContainer" : ""}>
        <h1 className="registerWelcomeText">Welcome to xHooked</h1>
        <div className="registerModalBodyContainer">
          <OnBoarding />
          <ToggleSignIn />
        </div>
      </div>
    </div>
  );
}

export default Modal;
