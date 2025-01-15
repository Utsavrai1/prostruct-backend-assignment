import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const authenticateAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretKey"
    );
    const user = await User.findById(decoded.id);

    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Not authorized" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
