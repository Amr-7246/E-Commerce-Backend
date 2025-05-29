import { Schema, model, Document, Types } from "mongoose";

//  ? ################### Types for TS
interface IVideoQuality {
  resolution: '360p' | '480p' | '720p' | '1080p' | '4K';
  url: string;
  fileSize: number; // * in MB
}

interface ISubtitle {
  language: string;
  url: string; // * subtitle file URL
}

interface IChapter {
  title: string;
  startTime: number; // * in seconds
  endTime: number; // * in seconds
}

interface ICreator {
  name: string;
  bio: string;
  avatar: { secure_url: string; publicId: string };
  socialLinks: {
    youtube?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export interface IVideo extends Document {
  title: string;
  description: string;
  shortDescription: string;
  
  // * Media Files
  videoQualities: IVideoQuality[];
  thumbnail: { secure_url: string; publicId: string };
  subtitles: ISubtitle[];
  
  // * Video Details
  duration: number; // * in seconds
  chapters: IChapter[];
  
  // * Creator Info
  creator: ICreator;
  
  // * Pricing & Business
  price: number;
  discount: number;
  originalPrice: number; // * calculated field
  isPaid: boolean;
  
  // * Video Meta
  category: Types.ObjectId;
  tags: string[];
  genre: string;
  ageRating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  
  // * Viewer Metrics
  viewCount: number;
  likeCount: number;
  dislikeCount: number;
  averageRating: number;
  totalReviews: number;
  
  // * Video Status
  isPublished: boolean;
  isRecommended: boolean;
  isFeatured: boolean;
  
  // * Technical Details
  format: string; // * mp4, webm, etc.
  aspectRatio: string; // * 16:9, 4:3, etc.
  frameRate: number; // * fps
  
  // * SEO & Discovery
  keywords: string[];
  viewerLanguage: string[];
  
  // * Dates
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  releaseDate?: Date; // * for scheduled releases
}
// ? ################### Types for TS
// ? ################### Data Schema for MongoDB 
const VideoSchema = new Schema<IVideo>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, minlength: 20 },
  shortDescription: { type: String, required: true, maxlength: 150 },
  
  //* Media Files
  videoQualities: [{
    resolution: { 
      type: String, 
      enum: ['360p', '480p', '720p', '1080p', '4K'],
      required: true 
    },
    url: { type: String, required: true },
    fileSize: { type: Number, required: true }
  }],
  
  thumbnail: {
    secure_url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  
  subtitles: [{
    language: { type: String, required: true },
    url: { type: String, required: true }
  }],
  
  //* Video Details
  duration: { type: Number, required: true }, //* seconds
  chapters: [{
    title: { type: String, required: true },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true }
  }],
  
  //* Creator
  creator: {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    avatar: {
      secure_url: { type: String, required: true },
      publicId: { type: String, required: true }
    },
    socialLinks: {
      youtube: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      website: { type: String }
    }
  },
  
  //* Pricing
  price: { type: Number, default: 0, min: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  isPaid: { type: Boolean, default: false },
  
  //* Video Meta
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tags: [{ type: String }],
  genre: { type: String, required: true },
  ageRating: { 
    type: String, 
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
    default: 'G'
  },
  
  //* Metrics
  viewCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 },
  dislikeCount: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  
  //* Status
  isPublished: { type: Boolean, default: false },
  isRecommended: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  
  //* Technical
  format: { type: String, default: 'mp4' },
  aspectRatio: { type: String, default: '16:9' },
  frameRate: { type: Number, default: 30 },
  
  //* SEO
  keywords: [{ type: String }],
  viewerLanguage: [{ type: String }],
  
  publishedAt: { type: Date },
  releaseDate: { type: Date }
}, {
  timestamps: true
});

// ? ################### Virtual Fields
VideoSchema.virtual('originalPrice').get(function() {
  return this.discount > 0 ? 
    Math.round(this.price / (1 - this.discount / 100)) : 
    this.price;
});

VideoSchema.virtual('durationFormatted').get(function() {
  const hours = Math.floor(this.duration / 3600);
  const minutes = Math.floor((this.duration % 3600) / 60);
  const seconds = this.duration % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// ? ################### Middleware
// Auto populate category
VideoSchema.pre(/^find/, function (next) {
  // @ts-ignore
  this.populate("category");
  next();
});

// Increment view count method
VideoSchema.methods.incrementViews = function() {
  this.viewCount += 1;
  return this.save();
};

// Calculate engagement rate
VideoSchema.virtual('engagementRate').get(function() {
  if (this.viewCount === 0) return 0;
  return ((this.likeCount + this.dislikeCount) / this.viewCount) * 100;
});

// ? ################### Indexes
VideoSchema.index({ title: 'text', description: 'text', tags: 'text' });
VideoSchema.index({ category: 1, isPublished: 1 });
VideoSchema.index({ viewCount: -1, averageRating: -1 });
VideoSchema.index({ price: 1, isPaid: 1 });
VideoSchema.index({ publishedAt: -1 });
VideoSchema.index({ 'creator.name': 1 });

export const Video = model<IVideo>("Video", VideoSchema);