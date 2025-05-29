import { Types } from "mongoose";

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