const { body } = require("express-validator");
const { USER_ROLES } = require("../../config/constants");

const register = [
  body("fullName").isString().trim().notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("confirmPassword")
    .isString()
    .custom((value, { req }) => value === req.body.password),
  body("role")
    .isString()
    .trim()
    .isIn([USER_ROLES.PASSENGER, USER_ROLES.SUPERVISOR, USER_ROLES.ADMIN]),
];

const login = [
  body("email").isEmail(),
  body("password").isString().isLength({ min: 6 }),
  body("rememberMe").optional().isBoolean(),
  body("role").optional().isString().trim(),
];

module.exports = {
  register,
  login,
};
