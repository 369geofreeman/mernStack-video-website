import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

import { categoryTitle } from '../../../store/actions/Index'

import categories from "../../../assets/dummyData/caegories";
import "./Categories.scss";

const Categories = props => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = e => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const results = categories.filter(cat =>
      cat.title.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

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
              style={{textDecoration: 'none'}}
              onClick={() => props.onCategoryTitle(item.categoryTag)}
              to={`/categories/${item.categoryTag}/${item.id}`}
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

//  Redux mapping
const mapDispatchToProps = dispatch => {
  return {
    onCategoryTitle: (title) => dispatch(categoryTitle(title))
  };
};

export default connect(null,mapDispatchToProps)(Categories);
