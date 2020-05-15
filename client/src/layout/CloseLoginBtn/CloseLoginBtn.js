import React from "react";

import "./CloseLoginBtn.css";

const CloseLoginBtn = ({ close }) => (
  <div onClick={close} className="closeLoginBtn">
    x
  </div>
);

export default CloseLoginBtn;
