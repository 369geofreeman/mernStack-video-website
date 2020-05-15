import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
// Components
import categories from "../../assets/utils/caegories";
// Redux
import {
  categoryTitle,
  currentCategoryIndex,
  getCategoryVideos,
  resetCategoryVideos
} from "../../store/actions/Index";
import "./VideoTitle.css";

const VideoTitle = ({
  getCategoryVideos,
  categoryTag,
  categoryTitle,
  title,
  category,
  resetCategoryVideos,
  currentCategoryIndex
}) => {
  const firstCategoryId = categories.filter(
    cat => cat.categoryTag === categoryTag
  )[0].id;

  const setCategory = () => {
    categoryTitle(categoryTag);
    resetCategoryVideos();
    currentCategoryIndex(0);
    getCategoryVideos([...categoryTag].filter(y => y !== "_").join(""));
  };

  return (
    <div className="headerVideoTitle">
      <h3>{title}</h3>
      <Link
        onClick={setCategory}
        to={`/categories/${categoryTag}/${firstCategoryId}`}
        className="categoryLinkTitle"
        data-tip
        data-for="categoryTip"
      >
        {category}
      </Link>
      <ReactTooltip
        id="categoryTip"
        place="bottom"
        offset={{ right: 30 }}
        effect="solid"
        delayHide={100}
        delayShow={600}
        border
        multiline={false}
      >
        {`See more from ${category}?`}
      </ReactTooltip>
    </div>
  );
};

export default connect(
  null,
  {
    categoryTitle,
    currentCategoryIndex,
    getCategoryVideos,
    resetCategoryVideos
  }
)(VideoTitle);
