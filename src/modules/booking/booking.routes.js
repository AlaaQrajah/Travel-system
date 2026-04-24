const express = require("express");
const controller = require("./booking.controller");
const validator = require("./booking.validator");
const validateRequest = require("../../core/middlewares/validateRequest");

const router = express.Router();

router.post("/", validator.createBooking, validateRequest, controller.createBooking);
router.get("/my-bookings", controller.getMyBookings);

module.exports = router;
