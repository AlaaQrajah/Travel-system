const express = require("express");
const controller = require("./health.controller");

const router = express.Router();

router.get("/", controller.getHealthStatus);

module.exports = router;
