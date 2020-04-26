import React from 'react'
import { connect } from 'react-redux'

import { modalClose } from '../../store/actions/Index'
import './ModalCloseBtn.scss'

const ModalCloseBtn = props => {


  return (
    <div className="closeBtnContainer" onClick={props.close}>
    <div className="closeBtnText" onClick={() => props.onModalClose()}>x</div>
    </div>
  )
}

//  Redux mapping
const mapDispatchToProps = dispatch => {
  return {
    onModalClose: () => dispatch(modalClose())
  };
};

export default connect(null, mapDispatchToProps)(ModalCloseBtn)