import mongoose, { Schema } from "mongoose";

export const OrderedItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  title: String,
  description: String,
  quantity: Number,
  imageUrls: [String],
});

export const OrderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  placedItems: [OrderedItemSchema],
});

export const OrderModel = new Schema({
  orderList: [OrderSchema],
});

export const Orders =
  mongoose.models.order || mongoose.model("order", OrderModel);
