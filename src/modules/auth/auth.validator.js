const { body } = require("express-validator");

const register = [
  body("fullName").optional().isString().trim(),
  body("email").optional().isEmail(),
  body("password").optional().isLength({ min: 6 }),
  body("role").optional().isString().trim(),
];

const login = [
  body("email").optional().isEmail(),
  body("password").optional().isString(),
];

module.exports = {
  register,
  login,
};
