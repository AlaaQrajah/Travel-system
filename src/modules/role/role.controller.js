const roleService = require("./role.service");
const { sendSuccess } = require("../../core/utils/apiResponse");

const getAvailableRoles = (req, res) => {
  const data = roleService.getAvailableRoles();
  return sendSuccess(res, data, "Roles fetched successfully.");
};

module.exports = {
  getAvailableRoles,
};
