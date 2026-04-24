const express = require("express");
const authRoutes = require("../modules/auth/auth.routes");
const bookingRoutes = require("../modules/booking/booking.routes");
const healthRoutes = require("../modules/health/health.routes");
const onboardingRoutes = require("../modules/onboarding/onboarding.routes");
const roleRoutes = require("../modules/role/role.routes");
const tripRoutes = require("../modules/trip/trip.routes");

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/onboarding", onboardingRoutes);
router.use("/auth", authRoutes);
router.use("/roles", roleRoutes);
router.use("/trips", tripRoutes);
router.use("/bookings", bookingRoutes);

module.exports = router;
