import { Document, model, Schema } from "mongoose";

// ? ################### Type for TS
  interface IVariant extends Document {
    name: string;
    options: string[];
  }
// ? ################### Type for TS
// ? ################### Data Schema with Data type But for MongoDB 
  const variantTypeSchema = new Schema<IVariant>(
    {
      name: { type: String, required: false, unique: false },
      options: [{ type: String, required: false }],
      },
      { timestamps: true }
    );
// ? ################### Data Schema with Data type But for MongoDB 

export const Variant = model<IVariant>("Variant", variantTypeSchema);
