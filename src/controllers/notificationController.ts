import { Request, Response } from "express";
import Event from "../models/Event";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendNotification = async (req: Request, res: Response) => {
  const { event_id, message } = req.body;

  try {
    const event = await Event.findById(event_id).populate("attendees");

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const attendeeEmails = event.attendees.map(
      (attendee: any) => attendee.email
    );

    const mailOptions = {
      from: process.env.EMAIL,
      to: attendeeEmails,
      subject: `Notification for Event: ${event.name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending notification", error });
  }
};
