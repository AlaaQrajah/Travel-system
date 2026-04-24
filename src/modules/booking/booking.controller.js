const bookingService = require("./booking.service");
const { sendSuccess } = require("../../core/utils/apiResponse");

const createBooking = (req, res, next) => {
  try {
    const data = bookingService.createBooking(req.body);
    return sendSuccess(res, data, "تم إنشاء الحجز بنجاح.", 201);
  } catch (error) {
    return next(error);
  }
};

const getAllBookings = (req, res, next) => {
  try {
    const data = bookingService.getAllBookings();
    return sendSuccess(res, data, "تم جلب جميع الحجوزات بنجاح.");
  } catch (error) {
    return next(error);
  }
};

const getMyBookings = (req, res, next) => {
  try {
    const data = bookingService.getMyBookings();
    return sendSuccess(res, data, "تم جلب الحجوزات بنجاح.");
  } catch (error) {
    return next(error);
  }
};

const getBookingById = (req, res, next) => {
  try {
    const data = bookingService.getBookingById(req.params.id);
    return sendSuccess(res, data, "تم جلب الحجز بنجاح.");
  } catch (error) {
    return next(error);
  }
};

const updateBooking = (req, res, next) => {
  try {
    const data = bookingService.updateBooking(req.params.id, req.body);
    return sendSuccess(res, data, "تم تحديث الحجز بنجاح.");
  } catch (error) {
    return next(error);
  }
};

const deleteBooking = (req, res, next) => {
  try {
    const data = bookingService.deleteBooking(req.params.id);
    return sendSuccess(res, data, "تم حذف الحجز بنجاح.");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  getMyBookings,
  updateBooking,
};
