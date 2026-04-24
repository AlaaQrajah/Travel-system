const { USER_ROLES } = require("../../config/constants");

const getAvailableRoles = () => [
  { key: USER_ROLES.PASSENGER, label: "Passenger" },
  { key: USER_ROLES.DRIVER, label: "Driver" },
  { key: USER_ROLES.SUPERVISOR, label: "Supervisor" },
  { key: USER_ROLES.ADMIN, label: "Admin" },
];

module.exports = {
  getAvailableRoles,
};
