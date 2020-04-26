import { createStore, combineReducers } from "redux";
import MouseMovingReducer from './reducers/MouseMovingReducer'
import AuthenticateReducer from './reducers/AuthenticateReducer'
import VideoIndexReducer from './reducers/VideoIndexReducer'
import CategoryModalOpen from './reducers/CategoryModalOpen'

const rootreducer = combineReducers({
  MouseMoving: MouseMovingReducer,
  Authenticate: AuthenticateReducer,
  VideoIndex: VideoIndexReducer,
  ModalOpen: CategoryModalOpen
});

const configureStore = () => {
  return createStore(rootreducer);
};

export default configureStore;
