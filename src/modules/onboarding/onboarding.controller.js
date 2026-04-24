const onboardingService = require("./onboarding.service");
const { sendSuccess } = require("../../core/utils/apiResponse");

const getSlides = (req, res) => {
  const data = onboardingService.getSlides();
  return sendSuccess(res, data, "Onboarding slides fetched successfully.");
};

module.exports = {
  getSlides,
};
