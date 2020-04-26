import React, { useState } from "react";

import { DUMMY_DATA_SFW as vids } from "../../../assets/dummyData/videos";
import NoSavedVidsMessage from "./NoSavedVidsMessage";
import SavedVids from "./SavedVids";
import "./SavedVids.scss";

const SavedVidsContainer = () => {
  const [vids2] = useState(vids);
  if (vids2.length === 0) {
    return <NoSavedVidsMessage />;
  }
  return (
      <ul className="thumnNailContainer">
        {vids2.map((vid, index) => {
          return (
            <SavedVids
              key={vid.id}
              id={vid.id}
              thumb={vid.thumbNail}
              title={vid.title}
              index={index}
            />
          );
        })}
        <NoSavedVidsMessage />
      </ul>
  );
};

export default SavedVidsContainer;
