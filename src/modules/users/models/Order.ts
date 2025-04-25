import { Schema, model, Document, Types } from "mongoose";

// ? ########### Data type for TS 
  interface IOrderItem {
    product: Types.ObjectId;
    variant: {
      options: { name: string; value: string }[];
      images: { secure_url: string; publicId: string }[];
      price: number;
    };
    quantity: number;
    subtotal: number; // price * quantity
    address: string;
    phone: string;
  }

  interface IOrder extends Document {
    customer: Types.ObjectId;
    seller: Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed";
    createdAt: Date;
    updatedAt: Date;
  }
// ? ########### Data type for TS 
// ? ########### Data type for MongoDB 
  const orderSchema = new Schema<IOrder>(
    {
      customer: { type: Schema.Types.ObjectId, ref: "User", required: false },
      items: [
        {
          product: { type: Schema.Types.ObjectId, ref: "Product", required: false },
          variant: {
            options: [{ name: String, value: String }],
            images: [
              {
                secure_url: { type: String, required: false },
                publicId: { type: String, required: false },
              },
            ],
            price: { type: Number, required: false },
          },
          quantity: { type: Number, required: false, min: 1 },
          subtotal: { type: Number, required: false },
        },
      ],
      totalAmount: { type: Number, required: false },
      status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },
    },
    { timestamps: true }
  );
// ? ########### Data type for MongoDB 
orderSchema.pre(/^find/, function (next) {
  //@ts-ignore
  this.populate("customer").populate("seller").populate("items.product");
  next();
});

export const Order = model<IOrder>("Order", orderSchema);
