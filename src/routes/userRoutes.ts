import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
} from "../controllers/userController";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/:id", getUserById);

router.put("/:id", updateUserById);

export default router;
