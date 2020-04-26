import React from "react";
import { Link } from "react-router-dom";

const HomePageButtons = props => {
  return (
    <div>
      <Link
        onClick={props.previousIndex}
        to={props.from}
        style={{ textDecoration: "none" }}
        className="savedVidsArrowsRight"
      >
        {"<"}
      </Link>
      <Link
        onClick={props.nextIndex}
        to={props.to}
        style={{ textDecoration: "none" }}
        className="savedVidsArrowsLeft"
      >
        {">"}
      </Link>
    </div>
  );
};

export default HomePageButtons;
