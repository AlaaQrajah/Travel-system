const { BOOKING_STATUS } = require("../config/constants");

let tripSequence = 1006;
let bookingSequence = 3000;

const buildRouteLabel = (origin, destination) => `من ${origin} إلى ${destination}`;

const tripStore = [
  {
    id: "trip-1001",
    origin: "حلب",
    destination: "دمشق",
    routeLabel: buildRouteLabel("حلب", "دمشق"),
    date: "2026-03-05",
    time: "10:30 AM",
    driverLabel: "المدير",
    price: 85000,
    seatsLeft: 9,
    coachType: "VIP",
  },
  {
    id: "trip-1002",
    origin: "حلب",
    destination: "حمص",
    routeLabel: buildRouteLabel("حلب", "حمص"),
    date: "2026-03-15",
    time: "10:30 AM",
    driverLabel: "المدير",
    price: 60000,
    seatsLeft: 6,
    coachType: "Standard",
  },
  {
    id: "trip-1003",
    origin: "حلب",
    destination: "حمص",
    routeLabel: buildRouteLabel("حلب", "حمص"),
    date: "2026-05-05",
    time: "10:30 AM",
    driverLabel: "المدير",
    price: 62000,
    seatsLeft: 11,
    coachType: "Comfort",
  },
  {
    id: "trip-1004",
    origin: "حلب",
    destination: "اللاذقية",
    routeLabel: buildRouteLabel("حلب", "اللاذقية"),
    date: "2026-03-25",
    time: "10:30 AM",
    driverLabel: "المدير",
    price: 70000,
    seatsLeft: 7,
    coachType: "VIP",
  },
  {
    id: "trip-1005",
    origin: "حلب",
    destination: "دير الزور",
    routeLabel: buildRouteLabel("حلب", "دير الزور"),
    date: "2026-03-15",
    time: "10:30 AM",
    driverLabel: "المدير",
    price: 91000,
    seatsLeft: 5,
    coachType: "Standard",
  },
  {
    id: "trip-1006",
    origin: "حلب",
    destination: "الرقة",
    routeLabel: buildRouteLabel("حلب", "الرقة"),
    date: "2026-03-18",
    time: "10:30 AM",
    driverLabel: "المدير",
    price: 73000,
    seatsLeft: 8,
    coachType: "Comfort",
  },
];

const bookingStore = [];

const nextId = (prefix) => {
  if (prefix === "trip") {
    tripSequence += 1;
    return `trip-${tripSequence}`;
  }

  bookingSequence += 1;
  return `booking-${bookingSequence}`;
};

const createTripRecord = (payload) => ({
  id: nextId("trip"),
  origin: payload.origin,
  destination: payload.destination,
  routeLabel: buildRouteLabel(payload.origin, payload.destination),
  date: payload.date,
  time: payload.time,
  driverLabel: payload.driverLabel || "المدير",
  price: Number(payload.price),
  seatsLeft: Number(payload.seatsLeft),
  coachType: payload.coachType || "Standard",
});

const createBookingRecord = (payload, trip) => ({
  id: nextId("booking"),
  tripId: trip.id,
  tripLabel: trip.routeLabel,
  passengerName: payload.passengerName,
  passengerPhone: payload.passengerPhone || null,
  seats: Number(payload.seats),
  status: payload.status || BOOKING_STATUS.CONFIRMED,
  totalPrice: Number(payload.seats) * trip.price,
  travelDate: trip.date,
  travelTime: trip.time,
  createdAt: new Date().toISOString(),
});

module.exports = {
  BOOKING_STATUS,
  bookingStore,
  buildRouteLabel,
  createBookingRecord,
  createTripRecord,
  tripStore,
};
