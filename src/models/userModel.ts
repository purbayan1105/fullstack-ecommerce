import mongoose, { Schema, Types } from "mongoose";

const OtpDetailsSchema = new Schema({
  verificationCode: {
    type: String,
  },
  expiry_of_otp: String,
});

const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true, ref: "products" },
  title: String,
  description: String,
  price: String,
  imageUrls: [String],
  quantity: { type: Number, default: 1 },
  isChecked: {
    type: Boolean,
    default: true,
  },
  isCheckedOut: {
    type: Boolean,
    default: false,
  },
});

const FavouriteItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, required: true, ref: "products" },
  title: String,
  description: String,
  price: String,
  sku: String,
  imageUrls: [String],
  isFavourite: {
    type: Boolean,
    default: true,
  },
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
  addToCart: [CartItemSchema],
  favouriteItems: [FavouriteItemSchema],
});

export const User = mongoose.models.user || mongoose.model("user", UserModel);
