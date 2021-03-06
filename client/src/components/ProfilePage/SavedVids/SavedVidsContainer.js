import React from "react";
import { connect } from "react-redux";

// Components
import NoSavedVidsMessage from "./NoSavedVidsMessage";
import SavedVids from "./SavedVids";
import Spinner from "../../../layout/Spinner";
import "./SavedVids.scss";

const SavedVidsContainer = ({ auth: { user, loading } }) => {
  return loading && user === null ? (
    <Spinner />
  ) : user.savedVids.length === 0 ? (
    <NoSavedVidsMessage />
  ) : (
    <>
      <ul className="thumnNailContainer">
        {user.savedVids.map((vid, index) => {
          return (
            <SavedVids
              key={index}
              _id={vid._id}
              thumb={vid.thumbNail}
              title={vid.title}
              index={index}
            />
          );
        })}
        <div className="nosavedVidsHandler"></div>
      </ul>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.Authenticate,
});

export default connect(mapStateToProps)(SavedVidsContainer);
