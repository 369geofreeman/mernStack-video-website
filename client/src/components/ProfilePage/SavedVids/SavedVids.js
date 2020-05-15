import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import {
  userSavedIndex,
  delSavedVid,
  setAlert,
} from "../../../store/actions/Index";
import "./SavedVids.scss";

const SavedVids = ({
  userSavedIndex,
  delSavedVid,
  index,
  _id,
  thumb,
  title,
  setAlert,
}) => {
  let location = useLocation();

  const setindex = (index) => userSavedIndex(index);

  const delVid = async () => {
    await delSavedVid(_id);
    setAlert(`Video removed`, "success");
  };

  return (
    <div>
      <div style={{ color: "white", textDecoration: "none" }}>
        <li className="userSavedVidsContainer">
          <Link
            onClick={() => setindex(index)}
            to={{
              pathname: `/saved/${_id}`,
              state: { background: location },
            }}
          >
            <img src={thumb} className="profileThumbNail" alt="" />
          </Link>
          <div className="userSavedVidTitle">
            <Link
              onClick={() => setindex(index)}
              to={{
                pathname: `/saved/${_id}`,
                state: { background: location },
              }}
              style={{ color: "white", textDecoration: "none" }}
            >
              {title.length >= 70 ? `${title.slice(0, 66)}...` : title}
            </Link>
            <>
              <div
                data-for="delClip"
                className="savedVidDeleteBtn"
                onClick={() =>
                  window.confirm(
                    `Are you sure you wish to remove this clip?`
                  ) && delVid()
                }
              >
                x
              </div>
              <ReactTooltip
                id="delClip"
                place="bottom"
                effect="solid"
                delayHide={100}
                delayShow={300}
                border
                multiline={false}
              >
                Delete Clip?
              </ReactTooltip>
            </>
          </div>
        </li>
      </div>
    </div>
  );
};

export default connect(null, { userSavedIndex, delSavedVid, setAlert })(
  SavedVids
);
