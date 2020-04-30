import { VIDEOS_ERROR, GET_VIDEOS } from "../actions/ActionTypes";

const initalState = {
  videos: [],
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
    default:
      return state;
  }
}
