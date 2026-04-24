const express = require("express");
const controller = require("./trip.controller");
const validator = require("./trip.validator");
const validateRequest = require("../../core/middlewares/validateRequest");

const router = express.Router();

router.get("/", controller.getAvailableTrips);
router.post("/search", validator.searchTrips, validateRequest, controller.searchTrips);

module.exports = router;
