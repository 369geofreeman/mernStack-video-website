import {
  CURRENT_INDEX,
  CURRENT_USER_INDEX,
  CATEGORY_TITLE,
  CURRENT_CATEGORY_INDEX
} from "./ActionTypes";

export const currentIndex = index => {
  return {
    type: CURRENT_INDEX,
    payLoad: index
  };
};

export const userSavedIndex = index => {
  return {
    type: CURRENT_USER_INDEX,
    payLoad: index
  };
};

export const currentCategoryIndex = index => {
  return {
    type: CURRENT_CATEGORY_INDEX,
    payLoad: index
  };
};

export const categoryTitle = title => {
  return {
    type: CATEGORY_TITLE,
    payLoad: title
  };
};
