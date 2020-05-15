import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
// Redux
import { modalClose } from "../../store/actions/Index";
// Components
import CloseLoginBtn from "../../layout/CloseLoginBtn/CloseLoginBtn";
import ToggleSignIn from "./RegisterForm/ToggleSignIn";
import OnBoarding from "./OnBoarding/OnBoarding";
import "./Modal.scss";

const Modal = ({ modalClose }) => {
  const [modalOpen, setModalOpen] = useState(false);
  let history = useHistory();

  useEffect(() => {
    setModalOpen(true);
  }, [modalOpen]);

  let back = (e) => {
    e.stopPropagation();
    history.goBack();
    modalClose();
  };

  return (
    <div>
      <div onClick={back} className="registerModalBackground" />
      <div className={modalOpen ? "registerModalContainer" : ""}>
        <h1 className="registerWelcomeText">Welcome to xHooked</h1>
        <div className="registerModalBodyContainer">
          <CloseLoginBtn close={back} />
          <ToggleSignIn />
          <OnBoarding />
        </div>
      </div>
    </div>
  );
};

export default connect(null, { modalClose })(Modal);
