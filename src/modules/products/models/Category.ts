import { Schema, model, Document, Types } from "mongoose";

// ? ################### Type for TS
  interface IOption {
    name: string;
    values: string[];
  }

  interface ICategory extends Document {
    name: string;
    slug: string;
    description?: string;
    parent?: Types.ObjectId;
    options: IOption[];
    image?: string;
    isActive: boolean;
  }
// ? ################### Type for TS
// ? ################### Data Schema with Data type But for MongoDB 
  const categorySchema = new Schema<ICategory>(
    {
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
      description: String,
      image: { secure_url: String, publicId: String },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );
// ? ################### Data Schema with Data type But for MongoDB 

export const Category = model<ICategory>("Category", categorySchema);
