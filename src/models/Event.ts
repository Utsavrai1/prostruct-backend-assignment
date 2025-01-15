import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IEvent extends Document {
  name: string;
  description?: string;
  date: Date;
  location: string;
  capacity: number;
  organizer: IUser["_id"];
  attendees: IUser["_id"][];
}

const EventSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEvent>("Event", EventSchema);
