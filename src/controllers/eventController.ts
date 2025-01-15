import { Request, Response } from "express";
import Event from "../models/Event";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { name, description, date, location, capacity } = req.body;
    const userId = req.user.id;

    const newEvent = new Event({
      name,
      description,
      date,
      location,
      capacity,
      organizer: userId,
      attendees: [],
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to create event" });
  }
};

export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve events" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate(
      "organizer attendees",
      "name email"
    );
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve event" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, date, location, capacity } = req.body;
    const userId = req.user.id;

    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    if (event.organizer && event.organizer.toString() !== userId) {
      res
        .status(403)
        .json({ error: "You are not authorized to update this event" });
      return;
    }

    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.capacity = capacity || event.capacity;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to update event" });
  }
};
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    if (event.organizer && event.organizer.toString() !== userId) {
      res
        .status(403)
        .json({ error: "You are not authorized to delete this event" });
      return;
    }

    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};
