import { Request, Response } from "express";
import Event from "../models/Event";
import User from "../models/User";

export const getPopularEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
      .populate("attendees")
      .sort({ attendees: -1 })
      .limit(5);

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving popular events", error });
  }
};

export const getActiveUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "attendees",
          as: "events",
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          numberOfRegistrations: { $size: "$events" },
        },
      },
      { $sort: { numberOfRegistrations: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving active users", error });
  }
};

export const getEventStats = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id).populate("attendees");

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const stats = {
      name: event.name,
      date: event.date,
      location: event.location,
      totalAttendees: event.attendees.length,
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving event stats", error });
  }
};
