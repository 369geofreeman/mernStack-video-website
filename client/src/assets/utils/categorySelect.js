const categorySelect = (cat) => {
  switch (cat) {
    case 'animal_gifs': return require("../../assets/dummyData/categoryVids/animalgifs.json");
    case 'animals_being_derps': return require("../../assets/dummyData/categoryVids/AnimalsBeingDerps.json");
    case 'cat_gifs': return require("../../assets/dummyData/categoryVids/catGifs.json");
    case 'dog_gifs': return require("../../assets/dummyData/categoryVids/dogGifs.json");
    case 'hamstaer_gifs': return require("../../assets/dummyData/categoryVids/hamsterGifs.json");
    case 'nature_gifs': return require("../../assets/dummyData/categoryVids/natureGifs.json");
    case 'nature_is_fucking_lit': return require("../../assets/dummyData/categoryVids/natureIsFuckingLit.json");
    case 'owls': return require("../../assets/dummyData/categoryVids/owls.json");
    case 'puppies': return require("../../assets/dummyData/categoryVids/puppies.json");
    case 'sharks': return require("../../assets/dummyData/categoryVids/sharks.json");
    case 'thalassophobia': return require("../../assets/dummyData/categoryVids/thalassophobia.json");
    case 'the_depth_below': return require("../../assets/dummyData/categoryVids/TheDepthsBelow.json");
    default: return require("../../assets/dummyData/categoryVids/thalassophobia.json")
  }
}

export default categorySelect