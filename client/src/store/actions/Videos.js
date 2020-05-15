import axios from "axios";

import {
  GET_VIDEOS,
  VIDEOS_ERROR,
  ADD_SAVED_VID,
  REMOVE_SAVED_VID,
  PROFILE_ERROR,
  GET_CATEGORY_VIDEOS,
  RESET_CATEGORY_VIDEOS,
} from "./ActionTypes";
import { setAlert } from "./Index";

// Add saved Video into users array
export const addSavedVid = (savedVid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    await axios.put("/api/users/savevid", savedVid, config);
    dispatch({
      type: ADD_SAVED_VID,
      payload: savedVid,
    });

    // dispatch(setAlert("Clip saved", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      playload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete saved video from users array
export const delSavedVid = (_id) => async (dispatch) => {
  try {
    await axios.delete(`/api/users/savevid/${_id}`);

    dispatch({
      type: REMOVE_SAVED_VID,
      payload: _id,
    });

    // dispatch(setAlert("Clip removed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      playload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all main videos
export const getSelectedVideos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/videos");

    dispatch({
      type: GET_VIDEOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VIDEOS_ERROR,
      playload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//  Get videos by category
export const getCategoryVideos = (category) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/categories/${category}`);

    dispatch({
      type: GET_CATEGORY_VIDEOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VIDEOS_ERROR,
      playload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Reset the videos loaded into category state
export const resetCategoryVideos = () => (dispatch) => {
  dispatch({
    type: RESET_CATEGORY_VIDEOS,
  });
};
