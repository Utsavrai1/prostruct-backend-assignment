import express from "express";
import {
  deleteUser,
  getAllEvents,
  getAllUsers,
} from "../controllers/adminController";
import { authenticateAdmin } from "../middleware/authMiddleware";
const router = express.Router();

router.get("/users", authenticateAdmin, getAllUsers);

router.get("/events", authenticateAdmin, getAllEvents);

router.delete("/users/:id", authenticateAdmin, deleteUser);

export default router;
