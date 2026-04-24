const express = require("express");
const controller = require("./role.controller");

const router = express.Router();

router.get("/", controller.getAvailableRoles);

module.exports = router;
