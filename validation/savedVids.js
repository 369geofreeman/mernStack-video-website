const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateSavedVidsInput(data) {
  let errors = {};

  data.vidLink = !isEmpty(data.vidLink) ? data.vidLink : "";

  if (Validator.isEmpty(data.vidLink)) {
    errors.vidLink = "video Link is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
