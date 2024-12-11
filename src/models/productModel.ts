import mongoose, { Schema } from "mongoose";

export const ProductModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  stocks: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "phones",
      "laptops",
      "accessories",
      "headphones",
      "speakers",
      "tablets",
    ],
  },

  sku: {
    type: String,
    required: true,
  },
  imageUrls: {
    type: [String],
  },
});

export const AddProducts =
  mongoose.models.products || mongoose.model("products", ProductModel);
