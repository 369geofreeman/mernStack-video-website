import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import categories from "../../assets/dummyData/caegories";

import { categoryTitle, currentCategoryIndex } from "../../store/actions/Index";
import "./VideoTitle.css";

const VideoTitle = props => {
  const firstCategoryId = categories.filter(
    cat => cat.categoryTag === props.categoryTag
  )[0].id;

  const setCategory = () => {
    props.onCategoryTitle(props.categoryTag);
    // props.onCurrentCategoryIndex(0)
  };

  return (
    <div className="headerVideoTitle">
      <h3>{props.title}</h3>
      <Link
        onClick={setCategory}
        to={`/categories/${props.categoryTag}/${firstCategoryId}`}
        className="categoryLinkTitle"
        data-tip
        data-for="categoryTip"
      >
        {props.category}
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
        {`See more from ${props.category}?`}
      </ReactTooltip>
    </div>
  );
};

//  Redux
const mapDispatchToProps = dispatch => {
  return {
    onCategoryTitle: title => dispatch(categoryTitle(title)),
    onCurrentCategoryIndex: () => dispatch(currentCategoryIndex())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(VideoTitle);
