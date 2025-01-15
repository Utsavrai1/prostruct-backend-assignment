import request from "supertest";
import mongoose from "mongoose";
import app from "../src/index";
import server from "../src/server";

const sampleEvent = {
  name: "Test Event",
  description: "This is a test event",
  date: new Date().toISOString(),
  location: "Test Location",
  capacity: 100,
};

describe("Event Management APIs", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
    server.close();
  });

  it("POST /events should create a new event", async () => {
    const userResponse = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });
    const token = userResponse.body.token;
    const response = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send(sampleEvent);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("name", sampleEvent.name);
    expect(response.body).toHaveProperty(
      "description",
      sampleEvent.description
    );
  });
});
