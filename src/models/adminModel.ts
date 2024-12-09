import mongoose, { Schema } from "mongoose";

export const admminModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export const Admin =
  mongoose.models.admins || mongoose.model("admins", admminModel);
