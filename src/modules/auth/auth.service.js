const { USER_ROLES } = require("../../config/constants");

const allowedRoles = new Set([
  USER_ROLES.PASSENGER,
  USER_ROLES.SUPERVISOR,
  USER_ROLES.ADMIN,
]);

const resolveRole = ({ role, email }) => {
  if (role && allowedRoles.has(role)) {
    return role;
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail.includes("admin") || normalizedEmail.includes("manager")) {
    return USER_ROLES.ADMIN;
  }

  if (normalizedEmail.includes("supervisor")) {
    return USER_ROLES.SUPERVISOR;
  }

  return USER_ROLES.PASSENGER;
};

const getRoleHomeScreen = (role) =>
  role === USER_ROLES.ADMIN || role === USER_ROLES.SUPERVISOR ? "roles" : "search";

const createUserProfile = ({ fullName, email, role }) => ({
  id: `user-${Date.now()}`,
  fullName: fullName || email.split("@")[0],
  email,
  role,
  homeScreen: getRoleHomeScreen(role),
});

const createSessionPayload = (user, rememberMe = false) => ({
  user,
  session: {
    rememberMe,
    accessToken: "mock-access-token",
    refreshToken: "mock-refresh-token",
    expiresIn: rememberMe ? "30d" : "8h",
  },
  ui: {
    redirectTo: user.homeScreen,
    theme: "rihlati-mobile",
  },
});

const register = (payload) => {
  const role = resolveRole(payload);
  const user = createUserProfile({
    fullName: payload.fullName,
    email: payload.email.trim().toLowerCase(),
    role,
  });

  return {
    ...createSessionPayload(user),
    profile: {
      accountType: role,
      welcomeTitle: "تم إنشاء الحساب بنجاح",
      nextStep:
        user.homeScreen === "roles"
          ? "افتح لوحة الإدارة لاختيار القسم المناسب."
          : "ابدأ بالبحث عن رحلة جديدة من الشاشة الرئيسية.",
    },
  };
};

const login = (payload) => {
  const role = resolveRole(payload);
  const user = createUserProfile({
    fullName: payload.fullName,
    email: payload.email.trim().toLowerCase(),
    role,
  });

  return createSessionPayload(user, payload.rememberMe);
};

module.exports = {
  register,
  login,
};
