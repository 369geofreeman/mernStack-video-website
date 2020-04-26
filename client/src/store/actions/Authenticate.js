import axios from "axios";
import {
  LOG_IN,
  LOG_OUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./ActionTypes";

// Log user in (DELETE)
export const logIn = () => {
  return {
    type: LOG_IN
  };
};
// Log user out (DELETE)
export const logOut = () => {
  return {
    type: LOG_OUT
  };
};

// Register a user
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(name, email, password);

  try {
    const res = await axios.post("/api/users/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
