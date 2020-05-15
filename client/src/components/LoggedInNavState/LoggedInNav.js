import React, { useState, useEffect } from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { useSpring, animated } from "react-spring";
import ReactTooltip from "react-tooltip";
// Redux
import { addSavedVid, loadUser, delSavedVid } from "../../store/actions/Index";
// Icons
import clipped from "../../assets/img/clipped.png";
import unClipped from "../../assets/img/unClipped.png";
import collection2 from "../../assets/img/pornFolderIcon.png";

import "./LoggedInNav.scss";

const LoggedInNav = ({
  vidIndex,
  categoryIndex,
  currentVideos: { videos },
  categoryVideos: { categoryVideos },
  auth: { user },
  addSavedVid,
  delSavedVid
}) => {
  const location = useLocation();
  const [savedVideos, setSavedVideos] = useState([]);
  const [currentSavedVid, setCurrentSavedVid] = useState(0);
  const [liked, setLiked] = useState(false);
  const { x } = useSpring({
    from: { x: 0 },
    x: !liked ? 0.5 : 0,
    config: { duration: 300 }
  });

  useEffect(() => {
    if (user) setSavedVideos(user.savedVids);
  }, [setSavedVideos, user]);

  // Check to see if video liked
  useEffect(() => {
    if (location.pathname.match("/categories/")) {
      categoryVideos.length > 0 &&
        savedVideos &&
        savedVideos.length > 0 &&
        savedVideos.map(vid => {
          if (vid.vidLink === categoryVideos[categoryIndex].vidLink) {
            setCurrentSavedVid(vid._id);
            return setTimeout(() => setLiked(true), 50);
          } else {
            return setLiked(false);
          }
        });
    } else {
      videos.length > 0 &&
        savedVideos &&
        savedVideos.length > 0 &&
        savedVideos.map(vid => {
          if (vid.vidLink === videos[vidIndex].vidLink) {
            setCurrentSavedVid(vid._id);
            return setTimeout(() => setLiked(true), 50);
          } else {
            return setLiked(false);
          }
        });
    }
    return setLiked(false);
  }, [
    setLiked,
    vidIndex,
    videos,
    savedVideos,
    categoryIndex,
    categoryVideos,
    location.pathname
  ]);

  // Like / unlike video
  const onLiked = async () => {
    if (location.pathname.match("/categories/")) {
      if (liked) {
        await delSavedVid(currentSavedVid);
        setLiked(!liked);
      } else {
        await addSavedVid(categoryVideos[categoryIndex]);
        loadUser();
        setLiked(!liked);
      }
    } else {
      if (liked) {
        await delSavedVid(currentSavedVid);
        setLiked(!liked);
      } else {
        await addSavedVid(videos[vidIndex]);
        loadUser();
        setLiked(!liked);
      }
    }
  };

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

const mapStateToProps = state => ({
  currentVideos: state.Videos,
  auth: state.Authenticate,
  vidIndex: state.VideoIndex.currentIndex,
  categoryVideos: state.Videos,
  categoryIndex: state.VideoIndex.categoryIndex
});

export default connect(
  mapStateToProps,
  { addSavedVid, loadUser, delSavedVid }
)(withRouter(LoggedInNav));
