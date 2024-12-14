import mongoose, { Schema, Types } from "mongoose";

const OtpDetailsSchema = new Schema({
  verificationCode: {
    type: String,
  },
  expiry_of_otp: String,
});

const AddressSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    enum: ["India"],
    default: "India",
  },
  telephone: {
    type: String,
    required: true,
  },
});

export const UserModel = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
  },
  otpDetails: OtpDetailsSchema,
  isVerified: {
    type: Boolean,
    default: false,
  },
  forgotPasswordOtp: String,
  forgotPasswordVerified: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.models.user || mongoose.model("user", UserModel);
