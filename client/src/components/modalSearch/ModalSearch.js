import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { categoryTitle, currentCategoryIndex, modalClose } from "../../store/actions/Index";

// DUMMY DATA
import categories from "../../assets/dummyData/caegories";
import "./ModalSearch.scss";

const ModalSearch = props => {
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

  const setSearchAndClose = item => {
    props.onCategoryTitle(item);
    props.onCurrentCategoryIndex(0);
    props.onModalClose()
  };

  return (
    <div className="containerFloat">
      <div className="search-outer">
        <form
          id="searchform"
          className="searchform"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="search"
            autoFocus={true}
            // value={searchTerm}
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
              to={`/categories/${item.categoryTag}/${item.id}`}
              onClick={() => setSearchAndClose(item.categoryTag)}
            >
              <div className="title">
                <h3 className="categoryTitle">{item.title}++</h3>
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
    onCategoryTitle: title => dispatch(categoryTitle(title)),
    onCurrentCategoryIndex: index => dispatch(currentCategoryIndex(index)),
    onModalClose: () => dispatch(modalClose())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ModalSearch);

// https://codesandbox.io/s/5yro4pql44
