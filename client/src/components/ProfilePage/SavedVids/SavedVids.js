import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { userSavedIndex } from "../../../store/actions/Index";
import "./SavedVids.scss";

const SavedVids = props => {
  let location = useLocation();

  const setindex = index => props.onCurrentIndex(index);

  return (
    <div>
      <Link
        onClick={() => setindex(props.index)}
        to={{ pathname: `/saved/${props.id}`, state: { background: location } }}
      >
        <li className="userSavedVidsContainer">
          <img src={props.thumb} className="profileThumbNail" alt="" />
          <div style={{ marginHorizontal: "50%" }}>
            <div className="userSavedVidTitle">
              {props.title.length >= 70
                ? `${props.title.slice(0, 66)}...`
                : props.title}
            </div>
          </div>
        </li>
      </Link>
    </div>
  );
};

//  Redux
const mapStateToProps = state => ({
  auth: state.Authentication
}); // Need to use this still | Use on account settings too

const mapDispatchToProps = dispatch => {
  return {
    onCurrentIndex: index => dispatch(userSavedIndex(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedVids);
