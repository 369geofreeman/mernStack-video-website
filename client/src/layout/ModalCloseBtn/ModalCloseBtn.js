import React from "react";
import { connect } from "react-redux";

import { modalClose } from "../../store/actions/Index";
import "./ModalCloseBtn.scss";

const ModalCloseBtn = ({ modalClose, close }) => {
  return (
    <div className="closeBtnContainer" onClick={close}>
      <div className="closeBtnText" onClick={() => modalClose()}>
        x
      </div>
    </div>
  );
};

export default connect(
  null,
  { modalClose }
)(ModalCloseBtn);
