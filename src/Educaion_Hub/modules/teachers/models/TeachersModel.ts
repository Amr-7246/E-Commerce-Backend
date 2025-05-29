import { Schema, model, Document } from "mongoose";

// ? ################### Type for TS
export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  specialization: string[];
  bio?: string;
  courses?: Schema.Types.ObjectId[];
  rating?: number;
  profileImage?: {
    secure_url: string;
    publicId: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
// ? ################### Type for TS

// ? ################### Data Schema with Data type But for MongoDB 
const teacherSchema = new Schema<ITeacher>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    phoneNumber: String,
    specialization: [{
      type: String,
      required: [true, "At least one specialization is required"]
    }],
    bio: String,
    courses: [{
      type: Schema.Types.ObjectId,
      ref: "Course"
    }],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    profileImage: {
      secure_url: String,
      publicId: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);
// ? ################### Data Schema with Data type But for MongoDB 

// ? ################### Auto Populate courses
teacherSchema.pre(/^find/, function(next) {
  // @ts-ignore
  this.populate("courses");
  next();
});
// ? ################### Auto Populate courses

export const Teacher = model<ITeacher>("Teacher", teacherSchema);
