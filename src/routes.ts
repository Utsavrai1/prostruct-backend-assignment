import { Router } from "express";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes";
import eventRegistrationRoutes from "./routes/eventRegistrationRoutes";
import adminRoutes from "./routes/adminRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import notificationRoutes from "./routes/notificationRoutes";

const router = Router();

router.use("/users", userRoutes);

router.use("/events", eventRoutes);

router.use("/events", eventRegistrationRoutes);

router.use("/admin", adminRoutes);

router.use("/analytics", analyticsRoutes);

router.use("/notifications", notificationRoutes);

export default router;
