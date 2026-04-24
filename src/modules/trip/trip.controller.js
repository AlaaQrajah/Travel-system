const tripService = require("./trip.service");
const { sendSuccess } = require("../../core/utils/apiResponse");

const searchTrips = (req, res, next) => {
  try {
    const data = tripService.searchTrips(req.body);
    return sendSuccess(res, data, "تم تنفيذ البحث عن الرحلات بنجاح.");
  } catch (error) {
    return next(error);
  }
};

const getAvailableTrips = (req, res, next) => {
  try {
    const data = tripService.getAvailableTrips();
    return sendSuccess(res, data, "تم جلب الرحلات بنجاح.");
  } catch (error) {
    return next(error);
  }
};

const getTripById = (req, res, next) => {
  try {
    const data = tripService.getTripById(req.params.id);
    return sendSuccess(res, data, "تم جلب الرحلة بنجاح.");
  } catch (error) {
    return next(error);
  }
};

const createTrip = (req, res, next) => {
  try {
    const data = tripService.createTrip(req.body);
    return sendSuccess(res, data, "تم إنشاء الرحلة بنجاح.", 201);
  } catch (error) {
    return next(error);
  }
};

const updateTrip = (req, res, next) => {
  try {
    const data = tripService.updateTrip(req.params.id, req.body);
    return sendSuccess(res, data, "تم تحديث الرحلة بنجاح.");
  } catch (error) {
    return next(error);
  }
};

const deleteTrip = (req, res, next) => {
  try {
    const data = tripService.deleteTrip(req.params.id);
    return sendSuccess(res, data, "تم حذف الرحلة بنجاح.");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTrip,
  deleteTrip,
  getAvailableTrips,
  getTripById,
  searchTrips,
  updateTrip,
};
