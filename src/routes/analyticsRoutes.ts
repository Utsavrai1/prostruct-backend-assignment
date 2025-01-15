import express from "express";
import {
  getPopularEvents,
  getActiveUsers,
  getEventStats,
} from "../controllers/analyticsController";

const router = express.Router();

router.get("/events/popular", getPopularEvents);
router.get("/users/active", getActiveUsers);
router.get("/events/:id/stats", getEventStats);

export default router;
