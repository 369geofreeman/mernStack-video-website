import {
  LOG_IN,
  LOG_OUT,
  RESISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/ActionTypes";

export const initialState = {
  isLoggedIn: false,
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

const AuthenticateReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: true
      };
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false
      };
    // SET HERE
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      };

    default:
      return state;
  }
};

export default AuthenticateReducer;
