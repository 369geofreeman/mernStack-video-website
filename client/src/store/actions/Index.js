// Authenticate
export { logout, register, loadUser, login } from "./Authenticate";

// Profile
export { getCurrentProfile, createProfile, deleteAccount } from "./Profile";

// Alerts
export { setAlert } from "./alert";

// Videos
export {
  getSelectedVideos,
  addSavedVid,
  delSavedVid,
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
