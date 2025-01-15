import { Request, Response } from "express";
import Event from "../models/Event";

export const registerForEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    if (event.attendees.includes(userId)) {
      res.status(400).json({ error: "User already registered for this event" });
      return;
    }

    if (event.attendees.length >= event.capacity) {
      res.status(400).json({ error: "Event is full" });
      return;
    }

    event.attendees.push(userId);
    await event.save();

    res
      .status(201)
      .json({ message: "User successfully registered for the event", event });
  } catch (error) {
    res.status(500).json({ error: "Failed to register for the event" });
  }
};

export const cancelRegistration = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    if (!event.attendees.includes(userId)) {
      res.status(400).json({ error: "User not registered for this event" });
      return;
    }

    event.attendees = event.attendees.filter(
      (attendee: any) => attendee.toString() !== userId
    );
    await event.save();

    res
      .status(200)
      .json({ message: "Registration successfully canceled", event });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel registration" });
  }
};

export const getEventAttendees = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate("attendees", "name email");
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    res.status(200).json(event.attendees);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve event attendees" });
  }
};
