const request = require("supertest");

const app = require("../src/app");

describe("UI support integration", () => {
  it("serves the UI preview from the root path", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toContain("معاينة شاشات رحلتي");
    expect(response.text).toContain("Rihlati UI Preview");
  });

  it("returns onboarding data that matches the three reference screens", async () => {
    const response = await request(app).get("/api/onboarding");

    expect(response.status).toBe(200);
    expect(response.body.data.total).toBe(3);
    expect(response.body.data.slides[0].title).toBe("بسهولة وأمان من خلال التطبيق");
  });

  it("filters trips by origin and destination", async () => {
    const response = await request(app).post("/api/trips/search").send({
      origin: "حلب",
      destination: "حمص",
    });

    expect(response.status).toBe(200);
    expect(response.body.data.total).toBeGreaterThan(0);
    expect(response.body.data.trips.every((trip) => trip.destination === "حمص")).toBe(true);
  });

  it("returns Arabic role cards used by the dashboard preview", async () => {
    const response = await request(app).get("/api/roles");

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(3);
    expect(response.body.data.map((role) => role.label)).toEqual(
      expect.arrayContaining(["المسافر", "المشرف", "المدير"]),
    );
  });
});
