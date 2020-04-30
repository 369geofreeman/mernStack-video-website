import React, { useState, useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import ReactPlayer from "react-player";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/open-animation/open-animation.scss";
import { connect } from "react-redux";

// MyComponenets
import HomePageButtons from "./HomePageButtons";
import VideoTitle from "../../components/VideoTitle/VideoTitle";
// Redux vars
import { currentIndex } from "../../store/actions/Index";
// Dummy data ( DUMMY_DATA_NSFW )
// import { DUMMY_DATA_SFW as DUMMY_DATA } from "../../assets/dummyData/videos";
import jData from "../../assets/dummyData/categoryVids/AllCategories.json";
// Helper functions
import useKeyPress from "../../assets/utils/useKeyPress";
import useWindowDimensions from "../../assets/utils/getWindowDimensions";
// Styles
import "./HomePage.scss";

const HomePage = ({ currentIndex, currentVideos, VideoIndex, modalOpen }) => {
  const { height, width } = useWindowDimensions();
  const [videos] = useState(jData); // Use jData for now
  const [videoLen] = useState(videos.length - 1);
  const [toggleVideoWithSpace, setToggleVideoWithSpace] = useState(true);

  const rightPress = useKeyPress("ArrowRight");
  const dPress = useKeyPress("d");
  const leftPress = useKeyPress("ArrowLeft");
  const aPress = useKeyPress("a");
  const spacePress = useKeyPress(" ");

  // Set the Video index from URL
  // let VideoIndex = 0;
  // if (window.location.href.split("/")[3]) {
  //   for (let i = 0; i < videos.length; i++) {
  //     if (videos[i]._id === +window.location.href.split("/")[3]) VideoIndex = i;
  //   }
  // } else {
  //   VideoIndex = VideoIndexRedux;
  // }

  // Get Videos
  // useEffect(() => {
  //   setVideos(currentVideos);
  // }, []);

  // Assign keybord to video controlls
  useEffect(() => {
    if (rightPress || dPress) {
      !modalOpen && currentIndex(VideoIndex === videoLen ? 0 : VideoIndex + 1);
    }
    // eslint-disable-next-line
  }, [rightPress, dPress, videoLen, currentIndex, modalOpen]);
  useEffect(() => {
    if (leftPress || aPress) {
      !modalOpen && currentIndex(VideoIndex === 0 ? videoLen : VideoIndex - 1);
    }
    // eslint-disable-next-line
  }, [leftPress, aPress, videoLen, currentIndex, modalOpen]);
  useEffect(() => {
    if (spacePress) {
      !modalOpen && setToggleVideoWithSpace(prevState => !prevState);
    }
  }, [spacePress, modalOpen]);

  // Set video Controlls
  const nextIndex = () => {
    currentIndex(VideoIndex === videoLen ? 0 : VideoIndex + 1);
  };

  const previousIndex = () => {
    currentIndex(VideoIndex === 0 ? videoLen : VideoIndex - 1);
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
  return (
    <div className="mainPageContainer">
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
      <HomePageButtons
        nextIndex={nextIndex}
        to={`/${videos[vidUrlIndexTo]._id}`} // USE .id
        previousIndex={previousIndex}
        from={`/${videos[vidUrlIndexFrom]._id}`}
      />
    </div>
  );
};

//  Redux mapping
const mapStateToProps = state => {
  return {
    VideoIndex: state.VideoIndex.currentIndex,
    modalOpen: state.ModalOpen.modalOpen,
    loading: state.Videos.loading,
    currentVideos: state.Videos.videos
  };
};

export default connect(
  mapStateToProps,
  { currentIndex }
)(HomePage);
