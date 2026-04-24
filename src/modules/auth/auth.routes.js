const express = require("express");
const controller = require("./auth.controller");
const validator = require("./auth.validator");
const validateRequest = require("../../core/middlewares/validateRequest");

const router = express.Router();

router.post("/register", validator.register, validateRequest, controller.register);
router.post("/login", validator.login, validateRequest, controller.login);

module.exports = router;
