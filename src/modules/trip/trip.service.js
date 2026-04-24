const createError = require("http-errors");

const { bookingStore, buildRouteLabel, createTripRecord, tripStore } = require("../../data/store");

const normalize = (value = "") => value.trim().toLowerCase();

const getLocations = (key) => [...new Set(tripStore.map((trip) => trip[key]))];

const findTripIndex = (id) => tripStore.findIndex((trip) => trip.id === id);

const findTripById = (id) => tripStore.find((trip) => trip.id === id);

const filterTrips = (filters = {}) =>
  tripStore.filter((trip) => {
    const matchesOrigin = !filters.origin || normalize(trip.origin) === normalize(filters.origin);
    const matchesDestination =
      !filters.destination || normalize(trip.destination) === normalize(filters.destination);
    const matchesDate = !filters.date || trip.date === filters.date;

    return matchesOrigin && matchesDestination && matchesDate;
  });

const syncTripDetailsToBookings = (trip) => {
  bookingStore.forEach((booking) => {
    if (booking.tripId !== trip.id) {
      return;
    }

    booking.tripLabel = trip.routeLabel;
    booking.travelDate = trip.date;
    booking.travelTime = trip.time;
    booking.totalPrice = booking.seats * trip.price;
  });
};

const getAvailableTrips = () => ({
  summary: {
    title: "احجز رحلتك بسهولة",
    subtitle: "رحلات جاهزة للحجز مع تفاصيل واضحة وسريعة",
    totalTrips: tripStore.length,
  },
  filters: {
    origins: getLocations("origin"),
    destinations: getLocations("destination"),
  },
  trips: tripStore,
});

const getTripById = (id) => {
  const trip = findTripById(id);

  if (!trip) {
    throw createError(404, "الرحلة غير موجودة.");
  }

  return trip;
};

const searchTrips = (filters) => {
  const results = filterTrips(filters);

  return {
    filters,
    total: results.length,
    trips: results,
  };
};

const createTrip = (payload) => {
  const newTrip = createTripRecord(payload);
  tripStore.push(newTrip);
  return newTrip;
};

const updateTrip = (id, payload) => {
  const tripIndex = findTripIndex(id);

  if (tripIndex === -1) {
    throw createError(404, "الرحلة غير موجودة.");
  }

  const currentTrip = tripStore[tripIndex];
  const updatedTrip = {
    ...currentTrip,
    ...payload,
    routeLabel: buildRouteLabel(
      payload.origin || currentTrip.origin,
      payload.destination || currentTrip.destination,
    ),
    price: payload.price !== undefined ? Number(payload.price) : currentTrip.price,
    seatsLeft: payload.seatsLeft !== undefined ? Number(payload.seatsLeft) : currentTrip.seatsLeft,
  };

  if (updatedTrip.seatsLeft < 0) {
    throw createError(422, "عدد المقاعد المتبقية يجب أن يكون صفراً أو أكثر.");
  }

  tripStore[tripIndex] = updatedTrip;
  syncTripDetailsToBookings(updatedTrip);

  return updatedTrip;
};

const deleteTrip = (id) => {
  const tripIndex = findTripIndex(id);

  if (tripIndex === -1) {
    throw createError(404, "الرحلة غير موجودة.");
  }

  const hasRelatedBookings = bookingStore.some((booking) => booking.tripId === id);

  if (hasRelatedBookings) {
    throw createError(409, "لا يمكن حذف رحلة مرتبطة بحجوزات حالية أو محفوظة.");
  }

  const [deletedTrip] = tripStore.splice(tripIndex, 1);
  return deletedTrip;
};

module.exports = {
  createTrip,
  deleteTrip,
  getAvailableTrips,
  getTripById,
  searchTrips,
  updateTrip,
};
