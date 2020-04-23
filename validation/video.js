const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVideoInput(data) {
  let errors = {};

  data.vidLink = !isEmpty(data.vidLink) ? data.vidLink : "";

  if (Validator.isEmpty(data.vidLink)) {
    errors.vidLink = "No link to video";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
