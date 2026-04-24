const express = require("express");
const controller = require("./booking.controller");
const validator = require("./booking.validator");
const validateRequest = require("../../core/middlewares/validateRequest");

const router = express.Router();

router.get("/", controller.getAllBookings);
router.get("/my-bookings", controller.getMyBookings);
router.get("/:id", validator.bookingId, validateRequest, controller.getBookingById);
router.post("/", validator.createBooking, validateRequest, controller.createBooking);
router.put("/:id", validator.updateBooking, validateRequest, controller.updateBooking);
router.delete("/:id", validator.bookingId, validateRequest, controller.deleteBooking);

module.exports = router;
