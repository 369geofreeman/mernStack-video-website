import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  ADD_SAVED_VID,
  REMOVE_SAVED_VID,
  ACCOUNT_DELETED
} from "../actions/ActionTypes";

export const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

const AuthenticateReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case ADD_SAVED_VID:
      return {
        ...state,
        user: {
          ...state.user,
          savedVids: [payload, ...state.user.savedVids]
        }
      };
    case REMOVE_SAVED_VID:
      return {
        ...state,
        user: {
          ...state.user,
          savedVids: state.user.savedVids.filter(vid => vid._id !== payload)
        }
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
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

// function updateVeryNestedField(state, action) {
//   return {
//       ...state,
//       first : {
//           ...state.first,
//           second : {
//               ...state.first.second,
//               [action.someId] : {
//                   ...state.first.second[action.someId],
//                   fourth : action.someValue
//               }
//           }
//       }
//   }
// }
