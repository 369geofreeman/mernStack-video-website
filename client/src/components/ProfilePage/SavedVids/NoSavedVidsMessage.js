import React from "react";
import { Link } from "react-router-dom";

import "./SavedVids.scss";

const NoSavedVidsMessage = () => {
  return (
    <div className="noSavedVidsContainer">
      <img
        src={require("../../../assets/img/bookmark.png")}
        alt=""
        className="noSavedVidsImage"
      />
      <h1 className="noSavedVidstitle">Save</h1>
      <h2 className="noSavedVidsbodyText">
        Save your favorite clips to view again
      </h2>
      <h2 className="noSavedVidsbodyText">
        Search by category or follow the link to the hottest and latest clips
      </h2>
      <div className="noSavedVidsBtnToHottestContainer">
        <Link to="/" className="noSavedVidsBtnToHottest">
          View the hottest
        </Link>
      </div>
    </div>
  );
};

export default NoSavedVidsMessage;
