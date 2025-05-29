import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";


// ? ################### Type for TS
export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
  refreshToken: String;
  phoneNumber?: string;
  enrolledCourses?: Schema.Types.ObjectId[];
  wishlist?: Schema.Types.ObjectId[];
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
const studentSchema = new Schema<IStudent>(
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
    refreshToken: String,
    phoneNumber: String,
    enrolledCourses: [{
      type: Schema.Types.ObjectId,
      ref: "Course"
    }],
    wishlist: [{
      type: Schema.Types.ObjectId,
      ref: "Course"
    }],
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
// ? ################### Auto Populate enrolledCourses and wishlist
studentSchema.pre(/^find/, function(next) {
  // @ts-ignore
  this.populate("enrolledCourses").populate("wishlist");
  next();
});
// ? ################### Auto Populate enrolledCourses and wishlist
// * Method to compare passwords
studentSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const Student = model<IStudent>("Student", studentSchema);
