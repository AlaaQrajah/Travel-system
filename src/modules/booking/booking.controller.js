const bookingService = require("./booking.service");
const { sendSuccess } = require("../../core/utils/apiResponse");

const createBooking = (req, res) => {
  const data = bookingService.createBooking(req.body);
  return sendSuccess(res, data, "Booking endpoint is ready for implementation.", 201);
};

const getMyBookings = (req, res) => {
  const data = bookingService.getMyBookings();
  return sendSuccess(res, data, "My bookings endpoint is ready for implementation.");
};

module.exports = {
  createBooking,
  getMyBookings,
};
