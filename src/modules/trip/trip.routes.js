const express = require("express");
const controller = require("./trip.controller");
const validator = require("./trip.validator");
const validateRequest = require("../../core/middlewares/validateRequest");

const router = express.Router();

router.get("/", controller.getAvailableTrips);
router.post("/search", validator.searchTrips, validateRequest, controller.searchTrips);
router.get("/:id", validator.tripId, validateRequest, controller.getTripById);
router.post("/", validator.createTrip, validateRequest, controller.createTrip);
router.put("/:id", validator.updateTrip, validateRequest, controller.updateTrip);
router.delete("/:id", validator.tripId, validateRequest, controller.deleteTrip);

module.exports = router;
