import { MOUSE_MOVING, MOUSE_NOT_MOVING } from "../actions/ActionTypes";

export const initialState = {
  mouseMoving: false,
};

const MouseMovingReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOUSE_MOVING:
      return {
        ...state,
        mouseMoving: true
      };
    case MOUSE_NOT_MOVING:
      return {
        ...state,
        mouseMoving: false
      }
    default:
      return state;
  }
};

export default MouseMovingReducer;
