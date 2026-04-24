const { body, param } = require("express-validator");

const requireBody = body().custom((value, { req }) => Object.keys(req.body || {}).length > 0);

const tripId = [param("id").isString().trim().notEmpty()];

const tripFields = [
  body("origin").isString().trim().notEmpty(),
  body("destination").isString().trim().notEmpty(),
  body("date").isISO8601(),
  body("time").isString().trim().notEmpty(),
  body("price").isFloat({ min: 0 }),
  body("seatsLeft").isInt({ min: 0 }),
  body("driverLabel").optional().isString().trim(),
  body("coachType").optional().isString().trim(),
];

const createTrip = tripFields;

const updateTrip = [
  ...tripId,
  requireBody,
  body("origin").optional().isString().trim().notEmpty(),
  body("destination").optional().isString().trim().notEmpty(),
  body("date").optional().isISO8601(),
  body("time").optional().isString().trim().notEmpty(),
  body("price").optional().isFloat({ min: 0 }),
  body("seatsLeft").optional().isInt({ min: 0 }),
  body("driverLabel").optional().isString().trim(),
  body("coachType").optional().isString().trim(),
];

const searchTrips = [
  body("origin").isString().trim().notEmpty(),
  body("destination").isString().trim().notEmpty(),
  body("date").optional({ values: "falsy" }).isISO8601(),
];

module.exports = {
  createTrip,
  searchTrips,
  tripId,
  updateTrip,
};
