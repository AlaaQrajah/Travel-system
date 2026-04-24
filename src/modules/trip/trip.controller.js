const tripService = require("./trip.service");
const { sendSuccess } = require("../../core/utils/apiResponse");

const searchTrips = (req, res) => {
  const data = tripService.searchTrips(req.body);
  return sendSuccess(res, data, "Trip search endpoint is ready for implementation.");
};

const getAvailableTrips = (req, res) => {
  const data = tripService.getAvailableTrips();
  return sendSuccess(res, data, "Trips fetched successfully.");
};

module.exports = {
  searchTrips,
  getAvailableTrips,
};
