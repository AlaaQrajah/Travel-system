const { sendSuccess } = require("../../core/utils/apiResponse");

const getHealthStatus = (req, res) => {
  return sendSuccess(
    res,
    {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
    "API is running."
  );
};

module.exports = {
  getHealthStatus,
};
