import React, { useState } from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import ReactTooltip from "react-tooltip";
// Imgs
import clipped from "../../assets/img/clipped.png";
import unClipped from "../../assets/img/unClipped.png";
import collection2 from "../../assets/img/pornFolderIcon.png";

import "./LoggedInNav.scss";

const LoggedInNav = () => {
  const [liked, setLiked] = useState(false);
  const { x } = useSpring({
    from: { x: 0 },
    x: !liked ? 0.5 : 0,
    config: { duration: 300 }
  });

  const onLiked = () => {
    setLiked(!liked);
  };

  const location = useLocation();
  if (
    location.pathname.match("/profile") ||
    location.pathname.match("/saved")
  ) {
    return null;
  } else {
    return (
      <div className="loggedInOuterContainer">
        <div className="LoggedInIconContainer">
          {liked ? (
            <animated.div
              className="animatedHeart"
              style={{
                transform: x
                  .interpolate({
                    range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                    output: [1, 0.99, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
                  })
                  .interpolate(x => `scale(${x})`)
              }}
            >
              <img
                onClick={onLiked}
                src={clipped}
                alt=""
                className="clippedHeartLiked"
              />
            </animated.div>
          ) : (
            <img
              data-tip
              data-for="clipTip"
              onClick={onLiked}
              src={unClipped}
              alt=""
              className="clippedHeart"
            />
          )}
          <ReactTooltip
            id="clipTip"
            place="bottom"
            effect="solid"
            delayHide={100}
            delayShow={300}
            border
            multiline={false}
          >
            Clip your favorites.
          </ReactTooltip>
        </div>
        <Link to={`/${"u2"}/profile`} data-tip data-for="profileTip">
          <img src={collection2} className="collectionIcon" alt="" />
        </Link>
        <ReactTooltip
          id="profileTip"
          place="bottom"
          effect="solid"
          delayHide={100}
          delayShow={300}
          border
          multiline={false}
        >
          View saved clips
        </ReactTooltip>
      </div>
    );
  }
};

export default withRouter(LoggedInNav);
