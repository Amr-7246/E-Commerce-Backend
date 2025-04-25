import { Schema, model, Document, Types } from "mongoose";
// ? ################### Type for TS
  interface IVariantOption {
    name: string; //color :red
    value: string; //size:lg
  }
  interface IVariant {
    options: IVariantOption[];
    images: { secure_url: string; publicId: string }[];
    price: number;
    quantity: number;
  }
  interface IProduct extends Document {
    name: string;
    description: string;
    images: { secure_url: string; publicId: string }[];
    variants: IVariant[];
    price: number;
    discount: number;
    category: string; 
    shortDesc: string;
  }
// ? ################### Type for TS
// ? ################### Data Schema with Data type But for MongoDB 
  const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, required: true, min: 10 },
    images: {
      type: [
        {
          secure_url: { type: String, required: false },
          publicId: { type: String, required: false },
        },
      ],
      required: false,
    },
    variants: [
      {
        options: [{ name: String, value: String }],
        images: {
          type: [
            {
              secure_url: { type: String, required: false },
              publicId: { type: String, required: false },
            },
          ],
          required: false,
        },
        price: { type: Number, required: false },
        inventory: { type: Number, required: false },
      },
    ],
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: { type: String },
    shortDesc: { type: String },
  });
// ? ################### Data Schema with Data type But for MongoDB 
// ? ################### Auto Category populate 
  // productSchema.pre(/^find/, function (next) {
  //   // @ts-ignore
  //   this.populate("category");
  //   next();
  // });
// ? ################### Auto Category populate 
export const Product = model<IProduct>("Product", productSchema);
