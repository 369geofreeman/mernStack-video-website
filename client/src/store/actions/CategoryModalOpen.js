import { MODAL_OPEN, MODAL_CLOSE } from "./ActionTypes";

export const modalOpen = () => dispatch => {
  dispatch({
    type: MODAL_OPEN
  });
};

export const modalClose = () => {
  return {
    type: MODAL_CLOSE
  };
};
