const createError = require("http-errors");

const { BOOKING_STATUS, bookingStore, createBookingRecord, tripStore } = require("../../data/store");

const isActiveBooking = (status) => status !== BOOKING_STATUS.CANCELLED;

const findTripById = (tripId) => tripStore.find((trip) => trip.id === tripId);

const findBookingIndex = (id) => bookingStore.findIndex((booking) => booking.id === id);

const getBookingByIdOrThrow = (id) => {
  const booking = bookingStore.find((item) => item.id === id);

  if (!booking) {
    throw createError(404, "الحجز غير موجود.");
  }

  return booking;
};

const ensureTripExists = (tripId) => {
  const trip = findTripById(tripId);

  if (!trip) {
    throw createError(404, "الرحلة المطلوبة غير موجودة.");
  }

  return trip;
};

const ensureSeatsAvailable = (trip, requestedSeats) => {
  if (requestedSeats > trip.seatsLeft) {
    throw createError(409, "عدد المقاعد المطلوبة أكبر من المقاعد المتاحة.");
  }
};

const getAllBookings = () => bookingStore;

const getMyBookings = () => bookingStore;

const getBookingById = (id) => getBookingByIdOrThrow(id);

const createBooking = (payload) => {
  const trip = ensureTripExists(payload.tripId);
  const requestedSeats = Number(payload.seats);
  ensureSeatsAvailable(trip, requestedSeats);

  trip.seatsLeft -= requestedSeats;

  const newBooking = createBookingRecord(payload, trip);
  bookingStore.push(newBooking);

  return newBooking;
};

const updateBooking = (id, payload) => {
  const bookingIndex = findBookingIndex(id);

  if (bookingIndex === -1) {
    throw createError(404, "الحجز غير موجود.");
  }

  const currentBooking = bookingStore[bookingIndex];
  const trip = ensureTripExists(currentBooking.tripId);

  const nextSeats = payload.seats !== undefined ? Number(payload.seats) : currentBooking.seats;
  const nextStatus = payload.status || currentBooking.status;
  const currentReservedSeats = isActiveBooking(currentBooking.status) ? currentBooking.seats : 0;
  const nextReservedSeats = isActiveBooking(nextStatus) ? nextSeats : 0;
  const seatDelta = nextReservedSeats - currentReservedSeats;

  if (seatDelta > 0) {
    ensureSeatsAvailable(trip, seatDelta);
  }

  trip.seatsLeft -= seatDelta;

  const updatedBooking = {
    ...currentBooking,
    ...payload,
    seats: nextSeats,
    status: nextStatus,
    totalPrice: nextSeats * trip.price,
    tripLabel: trip.routeLabel,
    travelDate: trip.date,
    travelTime: trip.time,
  };

  bookingStore[bookingIndex] = updatedBooking;
  return updatedBooking;
};

const deleteBooking = (id) => {
  const bookingIndex = findBookingIndex(id);

  if (bookingIndex === -1) {
    throw createError(404, "الحجز غير موجود.");
  }

  const [deletedBooking] = bookingStore.splice(bookingIndex, 1);
  const trip = findTripById(deletedBooking.tripId);

  if (trip && isActiveBooking(deletedBooking.status)) {
    trip.seatsLeft += deletedBooking.seats;
  }

  return deletedBooking;
};

module.exports = {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingById,
  getMyBookings,
  updateBooking,
};
