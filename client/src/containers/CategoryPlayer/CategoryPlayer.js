import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AwesomeSlider from "react-awesome-slider";
import ReactPlayer from "react-player";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/open-animation/open-animation.scss";
import PageLoadingLogo from "../../layout/PageLoadingLogo";
// Redux
import { currentCategoryIndex } from "../../store/actions/Index";
// Helper functions
import useKeyPress from "../../assets/utils/useKeyPress";
import useWindowDimensions from "../../assets/utils/getWindowDimensions";
// Components
import VideoTitleViewAll from "../../components/VideoTitle/VIdeoTitleViewAll";
import CategoryPlayerButtons from "./CategoryPlayerButtons";
import "./CategoryPlayer.scss";

const CategoryPlayer = ({
  currentCategoryIndex,
  VideoIndex,
  modalOpen,
  vidTitle,
  categoryVideos: { categoryVideos, categoryLoading }
}) => {
  const { width, height } = useWindowDimensions();
  const [videos] = useState(categoryVideos);
  const [videoLen] = useState(videos.length - 1);
  const [toggleVideoWithSpace, setToggleVideoWithSpace] = useState(true);

  const rightPress = useKeyPress("ArrowRight");
  const dPress = useKeyPress("d");
  const leftPress = useKeyPress("ArrowLeft");
  const aPress = useKeyPress("a");
  const spacePress = useKeyPress(" ");

  useEffect(() => {
    if (rightPress || dPress)
      !modalOpen &&
        currentCategoryIndex(VideoIndex === videoLen ? 0 : VideoIndex + 1);
    // eslint-disable-next-line;
  }, [
    VideoIndex,
    rightPress,
    dPress,
    videoLen,
    currentCategoryIndex,
    modalOpen
  ]);
  useEffect(() => {
    if (leftPress || aPress)
      !modalOpen &&
        currentCategoryIndex(VideoIndex === 0 ? videoLen : VideoIndex - 1);
    // eslint-disable-next-line
  }, [leftPress, aPress, videoLen, currentCategoryIndex, modalOpen]);
  useEffect(() => {
    if (spacePress)
      !modalOpen && setToggleVideoWithSpace(prevState => !prevState);
  }, [spacePress, modalOpen]);

  const nextIndex = () => {
    currentCategoryIndex(VideoIndex === videoLen ? 0 : VideoIndex + 1);
  };

  const previousIndex = () => {
    currentCategoryIndex(VideoIndex === 0 ? videoLen : VideoIndex - 1);
  };

  let vidUrlIndexTo = VideoIndex === videoLen ? VideoIndex : VideoIndex + 1;
  let vidUrlIndexFrom = VideoIndex === 0 ? videoLen : VideoIndex - 1;
  let slides = videos.map((slide, index) => {
    return (
      <div data-src="" key={slide.vidLink}>
        <VideoTitleViewAll
          title={slide.title}
          category={slide.category}
          categoryTag={slide.categoryTag}
        />
        <CategoryPlayerButtons
          nextIndex={nextIndex}
          to={`/categories/${vidTitle}/${videos[vidUrlIndexTo]._id}`}
          previousIndex={previousIndex}
          from={`/categories/${vidTitle}/${videos[vidUrlIndexFrom]._id}`}
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
                controlsList: "nodownload",
                disablepictureinpicture: "true"
              }
            }
          }}
          width={width}
          height={height}
        />
      </div>
    );
  });

  return categoryLoading ? (
    <PageLoadingLogo />
  ) : (
    <div className="catergoryPlayerContainer">
      <AwesomeSlider
        animation="openAnimation"
        cssModule={[CoreStyles, AnimationStyles]}
        bullets={false}
        fillParent={true}
        style={{ backgroundColor: "#000" }}
        buttons={false}
        selected={VideoIndex}
        mobileTouch={false}
      >
        {slides}
      </AwesomeSlider>
    </div>
  );
};

// Redux Vars
const mapStateToProps = state => {
  return {
    VideoIndex: state.VideoIndex.categoryIndex,
    vidTitle: state.VideoIndex.categoryTitle,
    modalOpen: state.ModalOpen.modalOpen,
    categoryVideos: state.Videos
  };
};

export default connect(
  mapStateToProps,
  { currentCategoryIndex }
)(CategoryPlayer);
