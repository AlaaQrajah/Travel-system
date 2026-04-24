const request = require("supertest");

const app = require("../src/app");

describe("Trip and booking CRUD API", () => {
  it("supports trip GET POST PUT DELETE flow", async () => {
    const createResponse = await request(app).post("/api/trips").send({
      origin: "حلب",
      destination: "طرطوس",
      date: "2026-06-01",
      time: "08:15 AM",
      price: 55000,
      seatsLeft: 12,
      coachType: "VIP",
      driverLabel: "المشرف",
    });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.data.routeLabel).toBe("من حلب إلى طرطوس");

    const tripId = createResponse.body.data.id;

    const getResponse = await request(app).get(`/api/trips/${tripId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body.data.id).toBe(tripId);

    const updateResponse = await request(app).put(`/api/trips/${tripId}`).send({
      price: 60000,
      seatsLeft: 10,
    });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.data.price).toBe(60000);
    expect(updateResponse.body.data.seatsLeft).toBe(10);

    const deleteResponse = await request(app).delete(`/api/trips/${tripId}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.data.id).toBe(tripId);

    const missingResponse = await request(app).get(`/api/trips/${tripId}`);

    expect(missingResponse.status).toBe(404);
  });

  it("supports booking GET POST PUT DELETE flow and keeps trip seats in sync", async () => {
    const tripResponse = await request(app).post("/api/trips").send({
      origin: "حلب",
      destination: "إدلب",
      date: "2026-07-10",
      time: "09:00 AM",
      price: 40000,
      seatsLeft: 5,
      coachType: "Standard",
    });

    const tripId = tripResponse.body.data.id;

    const createBookingResponse = await request(app).post("/api/bookings").send({
      tripId,
      passengerName: "أحمد",
      passengerPhone: "0999999999",
      seats: 2,
    });

    expect(createBookingResponse.status).toBe(201);
    expect(createBookingResponse.body.data.tripId).toBe(tripId);

    const bookingId = createBookingResponse.body.data.id;

    const listBookingsResponse = await request(app).get("/api/bookings");

    expect(listBookingsResponse.status).toBe(200);
    expect(listBookingsResponse.body.data.some((booking) => booking.id === bookingId)).toBe(true);

    const tripAfterCreate = await request(app).get(`/api/trips/${tripId}`);

    expect(tripAfterCreate.body.data.seatsLeft).toBe(3);

    const updateBookingResponse = await request(app).put(`/api/bookings/${bookingId}`).send({
      seats: 3,
      status: "confirmed",
    });

    expect(updateBookingResponse.status).toBe(200);
    expect(updateBookingResponse.body.data.seats).toBe(3);

    const tripAfterUpdate = await request(app).get(`/api/trips/${tripId}`);

    expect(tripAfterUpdate.body.data.seatsLeft).toBe(2);

    const deleteBookingResponse = await request(app).delete(`/api/bookings/${bookingId}`);

    expect(deleteBookingResponse.status).toBe(200);
    expect(deleteBookingResponse.body.data.id).toBe(bookingId);

    const tripAfterDelete = await request(app).get(`/api/trips/${tripId}`);

    expect(tripAfterDelete.body.data.seatsLeft).toBe(5);

    const deleteTripResponse = await request(app).delete(`/api/trips/${tripId}`);

    expect(deleteTripResponse.status).toBe(200);
  });
});
