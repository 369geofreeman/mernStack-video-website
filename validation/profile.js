const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.savedVids = !isEmpty(data.savedVids) ? data.savedVids : "";
  data.handle = !isEmpty(data.handle) ? data.handle : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 4 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
