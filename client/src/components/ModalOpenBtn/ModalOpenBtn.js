import React from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from 'react-redux'

import { modalOpen } from '../../store/actions/Index'
import "./ModalOpenBtn.scss";

const ModalOpenBtn = props => {
  let location = useLocation();

  return (
    <Link
      to={{ pathname: "/categories", state: { background: location } }}
      className="HamburgerContainer"
      onClick={() => props.onModalOpen()}
    >
      <div className="Hamburger" onClick={props.open}>
        <b></b>
        <b></b>
        <b></b>
      </div>
    </Link>
  );
};

//  Redux mapping
const mapDispatchToProps = dispatch => {
  return {
    onModalOpen: () => dispatch(modalOpen())
  };
};

export default connect(null, mapDispatchToProps)(ModalOpenBtn);
