import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AwesomeSlider from "react-awesome-slider";
import ReactPlayer from "react-player";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/open-animation/open-animation.scss";
// Redux
import { userSavedIndex } from "../../../store/actions/Index";
// Helper functions
import useKeyPress from "../../../assets/utils/useKeyPress";
import useWindowDimensions from "../../../assets/utils/getWindowDimensions";
// My Components
import VideoTitle from "../../VideoTitle/VideoTitle";
import SavedVidsSliderButtons from "./SavedVidsSliderButtons";
import Spinner from "../../../layout/Spinner";
import "./SavedVidsSliderModal.scss";

const SavedVidsSlider = ({
  onResetSavedIndex,
  VideoIndex,
  modalOpen,
  auth: { user, loading }
}) => {
  const { width, height } = useWindowDimensions();
  const [videos] = useState(user.savedVids);
  const [videoLen] = useState(user.savedVids.length - 1);
  const [toggleVideoWithSpace, setToggleVideoWithSpace] = useState(true);

  const rightPress = useKeyPress("ArrowRight");
  const dPress = useKeyPress("d");
  const leftPress = useKeyPress("ArrowLeft");
  const aPress = useKeyPress("a");
  const spacePress = useKeyPress(" ");

  useEffect(() => {
    if (rightPress || dPress) {
      !modalOpen &&
        onResetSavedIndex(VideoIndex === videoLen ? 0 : VideoIndex + 1);
    }
    // eslint-disable-next-line
  }, [rightPress, videoLen, dPress, onResetSavedIndex, modalOpen]);
  useEffect(() => {
    if (leftPress || aPress) {
      !modalOpen &&
        onResetSavedIndex(VideoIndex === 0 ? videoLen : VideoIndex - 1);
    }
    // eslint-disable-next-line
  }, [leftPress, videoLen, aPress, onResetSavedIndex, modalOpen]);
  useEffect(() => {
    if (spacePress) {
      !modalOpen && setToggleVideoWithSpace(prevState => !prevState);
    }
  }, [spacePress, modalOpen]);

  const nextIndex = () => {
    onResetSavedIndex(VideoIndex === videoLen ? 0 : VideoIndex + 1);
  };

  const previousIndex = () => {
    onResetSavedIndex(VideoIndex === 0 ? videoLen : VideoIndex - 1);
  };

  let slides = videos.map((slide, index) => {
    return (
      <div data-src="" key={slide.vidLink}>
        <VideoTitle
          title={slide.title}
          category={slide.category}
          categoryTag={slide.categoryTag}
        />
        <ReactPlayer
          url={videos[VideoIndex].vidLink}
          playing={toggleVideoWithSpace}
          loop
          controls
          disablePictureInPicture={true}
          style={{ backgroundColor: "#000" }}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload"
              }
            }
          }}
          width={width}
          height={height}
        />
      </div>
    );
  });

  let vidUrlIndexTo = VideoIndex === videoLen ? VideoIndex : VideoIndex + 1;
  let vidUrlIndexFrom = VideoIndex === 0 ? videoLen : VideoIndex - 1;

  return loading && user === null ? (
    <Spinner />
  ) : (
    <div className="savedVidsSliderContainer">
      <AwesomeSlider
        animation="openAnimation"
        cssModule={[CoreStyles, AnimationStyles]}
        bullets={false}
        fillParent={true}
        style={{ backgroundColor: "#000" }}
        buttons={false}
        selected={VideoIndex}
      >
        {slides}
      </AwesomeSlider>
      <SavedVidsSliderButtons
        nextIndex={nextIndex}
        to={`/saved/${videos[vidUrlIndexTo].id}`}
        previousIndex={previousIndex}
        from={`/saved/${videos[vidUrlIndexFrom].id}`}
      />
    </div>
  );
};

// Redux Vars
const mapStateToProps = state => {
  return {
    auth: state.Authenticate,
    VideoIndex: state.VideoIndex.userSavedIndex,
    modalOpen: state.ModalOpen.modalOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResetSavedIndex: index => dispatch(userSavedIndex(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedVidsSlider);
