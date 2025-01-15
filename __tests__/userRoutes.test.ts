import request from "supertest";
import mongoose from "mongoose";
import app from "../src/index";
import server from "../src/server";

const sampleUser = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
};

describe("User Management APIs", () => {
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

  it("POST /users/register should register a new user", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send(sampleUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(sampleUser.name);
    expect(response.body.email).toBe(sampleUser.email);
  });
});
