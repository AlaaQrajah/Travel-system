const { body } = require("express-validator");

const searchTrips = [
  body("origin").optional().isString().trim(),
  body("destination").optional().isString().trim(),
  body("date").optional().isISO8601(),
];

module.exports = {
  searchTrips,
};
