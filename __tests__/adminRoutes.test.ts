import request from "supertest";
import mongoose from "mongoose";
import app from "../src/index";
import User from "../src/models/User";
import server from "../src/server";
import bcrypt from "bcryptjs";

let adminToken: string;

describe("Admin APIs", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI as string);

    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "admin@example.com", password: "admin123" });

    adminToken = response.body.token;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });

  it("GET /admin/users should retrieve a list of all users with pagination", async () => {
    await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    const response = await request(app)
      .get("/api/admin/users?page=1&limit=10")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("users");
    expect(response.body.users.length).toBeGreaterThan(0);
    expect(response.body).toHaveProperty("totalUsers");
  });
});
