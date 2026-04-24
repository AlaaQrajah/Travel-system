const authService = require("./auth.service");
const { sendSuccess } = require("../../core/utils/apiResponse");

const register = (req, res) => {
  const data = authService.register(req.body);
  return sendSuccess(res, data, "Register endpoint is ready for implementation.", 200);
};

const login = (req, res) => {
  const data = authService.login(req.body);
  return sendSuccess(res, data, "Login endpoint is ready for implementation.", 200);
};

module.exports = {
  register,
  login,
};
