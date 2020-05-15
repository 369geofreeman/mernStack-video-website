import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  categoryTitle,
  currentCategoryIndex,
  getCategoryVideos,
  resetCategoryVideos
} from "../../../store/actions/Index";

import categories from "../../../assets/utils/caegories";
import "./Categories.scss";

const Categories = ({
  categoryTitle,
  currentCategoryIndex,
  getCategoryVideos,
  resetCategoryVideos
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const results = categories.filter(cat =>
      cat.title.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleChange = e => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const setSearchAndClose = item => {
    resetCategoryVideos();
    categoryTitle(item);
    currentCategoryIndex(0);
    getCategoryVideos([...item].filter(y => y !== "_").join(""));
  };

  return (
    <div className="profileCategoriesContainer">
      <div className="search-outer">
        <form
          id="searchform"
          className="searchform"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="search"
            autoFocus={true}
            onChange={handleChange}
            autoComplete="off"
            autoCorrect="off"
            name="s"
            id="s"
            placeholder="Search"
          />
        </form>
      </div>
      <ul className="data-list">
        {searchResults.map((item, index) => (
          <li className={"block-" + index} key={item.id}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/categories/${item.categoryTag}/js`}
              onClick={() => setSearchAndClose(item.categoryTag)}
            >
              <div className="title">
                <h3 className="categoryTitle">{item.title}</h3>
              </div>
              <div className="link">
                <h3 className="categoryTagLine">{item.tagLine}</h3>
              </div>
            </Link>
          </li>
        ))}
      </ul>
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
)(Categories);
