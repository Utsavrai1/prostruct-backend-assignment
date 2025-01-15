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

let token: string;
let eventId: string;

describe("Event Registration & Attendance APIs", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);

    const userResponse = await request(app).post("/api/users/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });
    token = userResponse.body.token;

    const eventResponse = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send(sampleEvent);
    eventId = eventResponse.body._id;
  });

  afterAll(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    await mongoose.disconnect();
    server.close();
  });

  it("POST /events/:id/register should register a user for the event", async () => {
    const response = await request(app)
      .post(`/api/events/${eventId}/register`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(201);
    expect(response.body.message).toBe(
      "User successfully registered for the event"
    );
  });

  it("DELETE /events/:id/register should cancel a user’s registration", async () => {
    const response = await request(app)
      .delete(`/api/events/${eventId}/register`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Registration successfully canceled");
  });

  it("GET /events/:id/attendees should retrieve a list of attendees for an event", async () => {
    const response = await request(app).get(`/api/events/${eventId}/attendees`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
