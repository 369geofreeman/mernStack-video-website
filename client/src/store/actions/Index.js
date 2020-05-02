// Authenticate
export { logout, register, loadUser, login } from "./Authenticate";

// Profile
export { getCurrentProfile, createProfile, deleteAccount } from "./Profile";

// Alerts
export { setAlert } from "./alert";

// Get videos || This will be a list of every category
export {
  getSelectedVideos,
  addSavedVid,
  getCategoryVideos,
  resetCategoryVideos
} from "./Videos";

// Video Index
export {
  currentIndex,
  userSavedIndex,
  categoryTitle,
  currentCategoryIndex
} from "./VideoIndex";

// Modal Open
export { modalOpen, modalClose } from "./CategoryModalOpen";
