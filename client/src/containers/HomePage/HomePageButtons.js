import React from "react";
import { Link } from "react-router-dom";
// Components
import Alert from "../../layout/Alert/Alert";

const HomePageButtons = ({ previousIndex, from, to, nextIndex }) => {
  return (
    <div>
      <Link
        onClick={previousIndex}
        to={from}
        style={{ textDecoration: "none" }}
        className="savedVidsArrowsRight"
      >
        {"<"}
      </Link>
      <Link
        onClick={nextIndex}
        to={to}
        style={{ textDecoration: "none" }}
        className="savedVidsArrowsLeft"
      >
        {">"}
      </Link>
      <div className="homePageAlert">
        <Alert />
      </div>
    </div>
  );
};

export default HomePageButtons;
