import axios from "axios";

const categorySelect = cat => {
  switch (cat) {
    case "animal_gifs":
      return axios.get("/api/categories/animalgifs");
    case "animals_being_derps":
      return axios.get("/api/categories/animalsbeingderps");
    case "cat_gifs":
      return axios.get("/api/categories/catgifs");
    case "dog_gifs":
      return axios.get("/api/categories/doggifs");
    case "hamstaer_gifs":
      return axios.get("/api/categories/hamstergifs");
    case "nature_gifs":
      return axios.get("/api/categories/naturegifs");
    case "nature_is_fucking_lit":
      return axios.get("/api/categories/natureisfuckinglit");
    case "owls":
      return axios.get("/api/categories/owls");
    case "puppies":
      return axios.get("/api/categories/puppies");
    case "sharks":
      return axios.get("/api/categories/sharks");
    case "thalassophobia":
      return axios.get("/api/categories/thalassophobia");
    case "the_depth_below":
      return axios.get("/api/categories/thedepthsbelow");
    default:
      return axios.get("/api/categories/animalgifs");
  }
};

export default categorySelect;

// Import categories from redux - probably need to set that up too
// b Try with direct await axios.get("/api/videos"); call first on one cartegory and use loading if [] = 0 in categoryPlayer.js
