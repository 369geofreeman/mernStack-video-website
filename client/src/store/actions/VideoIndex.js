import {
  CURRENT_INDEX,
  CURRENT_USER_INDEX,
  CATEGORY_TITLE,
  CURRENT_CATEGORY_INDEX
} from "./ActionTypes";

export const currentIndex = index => dispatch => {
  dispatch({
    type: CURRENT_INDEX,
    payLoad: index
  });
};

export const userSavedIndex = index => {
  return {
    type: CURRENT_USER_INDEX,
    payLoad: index
  };
};

export const currentCategoryIndex = index => dispatch => {
  dispatch({
    type: CURRENT_CATEGORY_INDEX,
    payLoad: index
  });
};

export const categoryTitle = title => dispatch => {
  dispatch({
    type: CATEGORY_TITLE,
    payLoad: title
  });
};
