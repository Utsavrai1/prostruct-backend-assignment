import { Router } from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";
import { authenticateUser } from "../middleware/authenticateUser";

const router = Router();

router.post("/", authenticateUser, createEvent);

router.get("/", getEvents);

router.get("/:id", getEventById);

router.put("/:id", authenticateUser, updateEvent);

router.delete("/:id", authenticateUser, deleteEvent);

export default router;
