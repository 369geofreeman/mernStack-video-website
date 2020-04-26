import { MOUSE_MOVING, MOUSE_NOT_MOVING } from "./ActionTypes";

export const mouseMoving = () => {
  return {
    type: MOUSE_MOVING
  };
};

export const mouseNotMoving = () => {
  return {
    type: MOUSE_NOT_MOVING
  }
}
