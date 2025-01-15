// __tests__/analyticsRoutes.test.ts
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/index";

describe("Analytics APIs", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
  });

  it("GET /analytics/events/popular should retrieve top 5 most registered events", async () => {
    const response = await request(app).get("/api/analytics/events/popular");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("GET /analytics/users/active should retrieve top 5 most active users", async () => {
    const response = await request(app).get("/api/analytics/users/active");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
