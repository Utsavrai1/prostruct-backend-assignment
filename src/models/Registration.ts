import mongoose, { Schema, Document } from "mongoose";

interface IRegistration extends Document {
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  registeredAt: Date;
}

const registrationSchema = new Schema<IRegistration>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    registeredAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IRegistration>(
  "Registration",
  registrationSchema
);
