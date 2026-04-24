const { body, param } = require("express-validator");

const requireBody = body().custom((value, { req }) => Object.keys(req.body || {}).length > 0);

const bookingId = [param("id").isString().trim().notEmpty()];

const createBooking = [
  body("tripId").isString().trim().notEmpty(),
  body("passengerName").isString().trim().notEmpty(),
  body("passengerPhone").optional().isString().trim(),
  body("seats").isInt({ min: 1 }),
];

const updateBooking = [
  ...bookingId,
  requireBody,
  body("passengerName").optional().isString().trim().notEmpty(),
  body("passengerPhone").optional().isString().trim(),
  body("seats").optional().isInt({ min: 1 }),
  body("status").optional().isIn(["pending", "confirmed", "cancelled"]),
];

module.exports = {
  bookingId,
  createBooking,
  updateBooking,
};
