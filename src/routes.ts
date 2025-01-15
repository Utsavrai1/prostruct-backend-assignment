import { Router } from "express";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import eventRegistrationRoutes from "./routes/eventRegistrationRoutes";
import adminRoutes from "./routes/adminRoutes";

const router = Router();

router.use("/users", userRoutes);

router.use("/events", eventRoutes);

router.use("/events", eventRegistrationRoutes);

router.use("/admin", adminRoutes);

export default router;
