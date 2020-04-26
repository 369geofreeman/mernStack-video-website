import {
  CURRENT_INDEX,
  CURRENT_USER_INDEX,
  CURRENT_CATEGORY_INDEX,
  CATEGORY_TITLE
} from "../actions/ActionTypes";

export const initialState = {
  currentIndex: 0,
  userSavedIndex: 0,
  categoryIndex: 0,
  categoryTitle: "dog_gifs" // Change this to all categories
};

const VideoIndexReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payLoad
      };
    case CURRENT_USER_INDEX:
      return {
        ...state,
        userSavedIndex: action.payLoad
      };
    case CURRENT_CATEGORY_INDEX:
      return {
        ...state,
        categoryIndex: action.payLoad
      };
    case CATEGORY_TITLE:
      return {
        ...state,
        categoryTitle: action.payLoad
      };
    default:
      return state;
  }
};

export default VideoIndexReducer;
