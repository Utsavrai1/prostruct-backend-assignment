import User from "../models/User";
import Event from "../models/Event";

import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  try {
    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    res.status(200).json({
      page,
      limit,
      totalUsers,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({}).populate("registrations");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await User.findByIdAndUpdate(id, { isDeleted: true });
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
