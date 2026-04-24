const { body } = require("express-validator");

const createBooking = [
  body("tripId").optional().isString().trim(),
  body("seats").optional().isInt({ min: 1 }),
];

module.exports = {
  createBooking,
};
