const express = require("express");
const controller = require("./onboarding.controller");

const router = express.Router();

router.get("/", controller.getSlides);

module.exports = router;
