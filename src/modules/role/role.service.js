const { USER_ROLES } = require("../../config/constants");

const getAvailableRoles = () => [
  {
    key: USER_ROLES.PASSENGER,
    label: "المسافر",
    description: "ابحث عن رحلتك واحجز بسهولة",
    icon: "user",
    accent: "sky",
    homeScreen: "search",
  },
  {
    key: USER_ROLES.SUPERVISOR,
    label: "المشرف",
    description: "إدارة الشركات والنظام",
    icon: "shield",
    accent: "indigo",
    homeScreen: "roles",
  },
  {
    key: USER_ROLES.ADMIN,
    label: "المدير",
    description: "إدارة الرحلات والحجوزات",
    icon: "briefcase",
    accent: "midnight",
    homeScreen: "roles",
  },
];

module.exports = {
  getAvailableRoles,
};
