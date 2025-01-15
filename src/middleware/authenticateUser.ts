import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IUser {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, "secretKey") as IUser;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
