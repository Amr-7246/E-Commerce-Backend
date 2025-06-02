import { Schema, model, Document, Types } from "mongoose";
// import { ICourse } from "./types/CoursesModelTypes";

// ? ################### Types for TS
interface ILesson {
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in minutes
  order: number;
  isPreview: boolean; // free preview lesson
}

interface IModule {
  title: string;
  description: string;
  lessons: ILesson[];
  order: number;
}

interface IInstructor {
  name: string;
  bio: string;
  avatar: { secure_url: string; publicId: string };
  expertise: string[];
}

export interface ICourse extends Document {
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: { secure_url: string; publicId: string };
  trailerVideo?: string; // promotional video
  
  // Course Structure
  modules: IModule[];
  totalDuration: number; // in minutes
  totalLessons: number;
  
  // Instructor Info
  instructor: IInstructor;
  
  // Pricing & Business
  price: number;
  discount: number;
  originalPrice: number; // calculated field
  
  // Course Meta
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  category: String;
  tags: string[];
  
  // Student Metrics
  enrolledStudents: number;
  averageRating: number;
  totalReviews: number;
  
  // Course Status
  isPublished: boolean;
  isRecommended: boolean;
  
  // Requirements & Outcomes
  requirements: string[];
  learningOutcomes: string[];
  
  // Dates
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}
// ? ################### Types for TS 
//? ################### Data Schema for MongoDB 
const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: false, trim: false },
  description: { type: String, required: false, minlength: 50 },
  shortDescription: { type: String, required: false, maxlength: 200 },
  
  thumbnail: {
    secure_url: { type: String, required: false },
    publicId: { type: String, required: false },
  },
  trailerVideo: { type: String },
  
  //* Course Structure
  modules: [{
    title: { type: String, required: false },
    description: { type: String, required: false },
    order: { type: Number, required: false },
    lessons: [{
      title: { type: String, required: false },
      description: { type: String, required: false },
      videoUrl: { type: String, required: false },
      duration: { type: Number, required: false },    //* minutes
      order: { type: Number, required: false },
      isPreview: { type: Boolean, default: false }
    }]
  }],

  totalDuration: { type: Number, default: 0 },
  totalLessons: { type: Number, default: 0 },

  //* Instructor
  instructor: {
    name: { type: String, required: false },
    bio: { type: String, required: false },
    avatar: {
      secure_url: { type: String, required: false },
      publicId: { type: String, required: false }
    },
    expertise: [{ type: String }]
  },

  //* Pricing
  price: { type: Number, required: false, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },

  //* Course Meta
  level: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced'], 
    required: false 
  },
  language: { type: String, default: 'English' },
  category: {
    type: Schema.Types.ObjectId ,
    ref: "Category",
    required: false,
  },
  tags: [{ type: String }],
  
  //* Metrics
  enrolledStudents: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  
  //* Status
  isPublished: { type: Boolean, default: false },
  isRecommended: { type: Boolean, default: false },
  
  //* Course Info
  requirements: [{ type: String }],
  learningOutcomes: [{ type: String }],
  
  publishedAt: { type: Date }
}, {
  timestamps: true //* adds createdAt and updatedAt
});

//* ? ################### Virtual Fields
CourseSchema.virtual('originalPrice').get(function() {
  return this.discount > 0 ? 
    Math.round(this.price / (1 - this.discount / 100)) : 
    this.price;
});

//* ? ################### Middleware
//* Auto populate category
// CourseSchema.pre(/^find/, function (next) {
//   //* @ts-ignore
//   this.populate("category");
//   next();
// });

//* Calculate totals before saving
CourseSchema.pre('save', function(next) {
  this.totalLessons = this.modules.reduce((total, module) => 
    total + module.lessons.length, 0
  );
  
  this.totalDuration = this.modules.reduce((total, module) => 
    total + module.lessons.reduce((moduleTotal, lesson) => 
      moduleTotal + lesson.duration, 0
    ), 0
  );
  
  next();
});

// ? ################### Indexes
CourseSchema.index({ title: 'text', description: 'text' });
CourseSchema.index({ category: 1, isPublished: 1 });
CourseSchema.index({ averageRating: -1, enrolledStudents: -1 });
CourseSchema.index({ price: 1 });

export const Course = model<ICourse>("Course", CourseSchema);