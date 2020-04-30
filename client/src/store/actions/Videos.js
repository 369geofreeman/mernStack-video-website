import axios from "axios";

import {
  GET_VIDEOS,
  VIDEOS_ERROR,
  ADD_SAVED_VID,
  PROFILE_ERROR
} from "./ActionTypes";
import { setAlert } from "./Index";

// Add saved Video into users array
export const addSavedVid = savedVid => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    const res = await axios.put("/api/users/savevid", savedVid, config);
    dispatch({
      type: ADD_SAVED_VID,
      payload: res.data
    });

    dispatch(setAlert("Clip saved", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      playload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete saved video from users array

// Get all main videos
export const getSelectedVideos = () => async dispatch => {
  try {
    const res = await axios.get("/api/videos");

    dispatch({
      type: GET_VIDEOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: VIDEOS_ERROR,
      playload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
