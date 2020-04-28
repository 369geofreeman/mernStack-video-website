import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// Reducers
import AuthenticateReducer from "./reducers/AuthenticateReducer";
import VideoIndexReducer from "./reducers/VideoIndexReducer";
import CategoryModalOpen from "./reducers/CategoryModalOpen";
import AlertReducer from "./reducers/AlertReducer";

const initialState = {};
const middleWare = [thunk];

const rootreducer = combineReducers({
  Authenticate: AuthenticateReducer,
  Alert: AlertReducer,
  VideoIndex: VideoIndexReducer,
  ModalOpen: CategoryModalOpen
});

const store = createStore(
  rootreducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
