import { Router } from "express";
import {
  registerForEvent,
  cancelRegistration,
  getEventAttendees,
} from "../controllers/eventRegistrationController";
import { authenticateUser } from "../middleware/authenticateUser";

const router = Router();

router.post("/:id/register", authenticateUser, registerForEvent);

router.delete("/:id/register", authenticateUser, cancelRegistration);

router.get("/:id/attendees", getEventAttendees);

export default router;
