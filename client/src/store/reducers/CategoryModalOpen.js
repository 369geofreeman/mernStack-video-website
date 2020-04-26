import { MODAL_OPEN, MODAL_CLOSE } from "../actions/ActionTypes";

export const initialState = {
  modalOpen: false,
};

const CategoryModalOpen = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        modalOpen: true
      };
    case MODAL_CLOSE:
      return {
        ...state,
        modalOpen: false
      }
    default:
      return state;
  }
};

export default CategoryModalOpen;
