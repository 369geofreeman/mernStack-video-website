import {
  VIDEOS_ERROR,
  GET_VIDEOS,
  GET_CATEGORY_VIDEOS,
  RESET_CATEGORY_VIDEOS
} from "../actions/ActionTypes";

const initalState = {
  videos: [],
  categoryVideos: [],
  categoryLoading: true,
  loading: true,
  error: {}
};

export default function(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: payload,
        loading: false
      };
    case VIDEOS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_CATEGORY_VIDEOS:
      return {
        ...state,
        categoryVideos: payload,
        categoryLoading: false
      };
    case RESET_CATEGORY_VIDEOS:
      return {
        ...state,
        categoryLoading: true,
        categoryVideos: []
      };
    default:
      return state;
  }
}
