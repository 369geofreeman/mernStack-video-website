import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AwesomeSlider from "react-awesome-slider";
import ReactPlayer from "react-player";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/open-animation/open-animation.scss";
// Reduc
import { currentCategoryIndex } from "../../store/actions/Index";
// Helper functions
import categorySelect from "../../assets/utils/categorySelect";
import useKeyPress from "../../assets/utils/useKeyPress";
import useWindowDimensions from "../../assets/utils/getWindowDimensions";
// My Components
import VideoTitleViewAll from "../../components/VideoTitle/VIdeoTitleViewAll";
import CategoryPlayerButtons from "./CategoryPlayerButtons";
import "./CategoryPlayer.scss";

const CategoryPlayer = props => {
  const categorySet = categorySelect(props.vidTitle);
  const { width, height } = useWindowDimensions();
  const [videos] = useState(categorySet);
  const [videoLen, setVidLength] = useState(0);
  const [toggleVideoWithSpace, setToggleVideoWithSpace] = useState(true);

  const rightPress = useKeyPress("ArrowRight");
  const dPress = useKeyPress("d");
  const leftPress = useKeyPress("ArrowLeft");
  const aPress = useKeyPress("a");
  const spacePress = useKeyPress(" ");

  let { onResetCurrentCategoryIndex, VideoIndex, modalOpen } = props;

  // To stop a very rare bug in slow server
  if (!VideoIndex) VideoIndex = 0;

  useEffect(() => {
    setVidLength(videos.length - 1);
    if (rightPress || dPress)
      !modalOpen &&
        onResetCurrentCategoryIndex(
          VideoIndex === videoLen ? 0 : VideoIndex + 1
        );
    // eslint-disable-next-line
  }, [
    rightPress,
    dPress,
    videoLen,
    videos.length,
    onResetCurrentCategoryIndex,
    modalOpen
  ]);
  useEffect(() => {
    if (leftPress || aPress)
      !modalOpen &&
        onResetCurrentCategoryIndex(
          VideoIndex === 0 ? videoLen : VideoIndex - 1
        );
    // eslint-disable-next-line
  }, [leftPress, aPress, videoLen, onResetCurrentCategoryIndex, modalOpen]);
  useEffect(() => {
    if (spacePress)
      !modalOpen && setToggleVideoWithSpace(prevState => !prevState);
  }, [spacePress, modalOpen]);

  const nextIndex = () => {
    onResetCurrentCategoryIndex(VideoIndex === videoLen ? 0 : VideoIndex + 1);
  };

  const previousIndex = () => {
    onResetCurrentCategoryIndex(VideoIndex === 0 ? videoLen : VideoIndex - 1);
  };

  let slides = videos.map((slide, index) => {
    return (
      <div data-src="" key={slide.vidLink}>
        <VideoTitleViewAll
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
  return (
    <div className="catergoryPlayerContainer">
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
      <CategoryPlayerButtons
        nextIndex={nextIndex}
        to={`/categories/${props.vidTitle}/${videos[vidUrlIndexTo]._id}`}
        previousIndex={previousIndex}
        from={`/categories/${props.vidTitle}/${videos[vidUrlIndexFrom]._id}`}
      />
    </div>
  );
};

// Redux Vars
const mapStateToProps = state => {
  return {
    VideoIndex: state.VideoIndex.categoryIndex,
    vidTitle: state.VideoIndex.categoryTitle,
    modalOpen: state.ModalOpen.modalOpen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResetCurrentCategoryIndex: index => dispatch(currentCategoryIndex(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPlayer);
