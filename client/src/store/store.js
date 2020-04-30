import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// Reducers
import AuthenticateReducer from "./reducers/AuthenticateReducer";
import VideoIndexReducer from "./reducers/VideoIndexReducer";
import CategoryModalOpen from "./reducers/CategoryModalOpen";
import AlertReducer from "./reducers/AlertReducer";
import ProfileReducer from "./reducers/ProfileReducer";
import VideosReducer from "./reducers/VideosReducer";

const initialState = {};
const middleWare = [thunk];

const rootreducer = combineReducers({
  Authenticate: AuthenticateReducer,
  Alert: AlertReducer,
  ModalOpen: CategoryModalOpen,
  Profile: ProfileReducer,
  VideoIndex: VideoIndexReducer,
  Videos: VideosReducer
});

const store = createStore(
  rootreducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
