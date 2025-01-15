import express from "express";
import connectDB from "./database";
import cors from "cors";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", routes);

setupSwagger(app);

connectDB();

export default app;
