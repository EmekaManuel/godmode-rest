import mongoose, { mongo } from "mongoose";
import { customAlphabet } from "nanoid";

import { UserDocument } from "./user.model";

const nanoId = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface productInput {
  user: UserDocument["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductDocument extends productInput {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      ref: "User",
      required: true,
      unique: true,
      default: () => `product_${nanoId}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Session", productSchema);
export default ProductModel;
