import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { modalOpen } from "../../store/actions/Index";
import "./ModalOpenBtn.scss";

const ModalOpenBtn = ({ modalOpen, open }) => {
  let location = useLocation();

  return (
    <Link
      to={{ pathname: "/categories", state: { background: location } }}
      className="HamburgerContainer"
      onClick={() => modalOpen()}
    >
      <div className="Hamburger" onClick={open}>
        <b></b>
        <b></b>
        <b></b>
      </div>
    </Link>
  );
};

export default connect(
  null,
  { modalOpen }
)(ModalOpenBtn);
