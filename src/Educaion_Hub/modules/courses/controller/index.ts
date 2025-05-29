import { Request, Response, NextFunction } from "express";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "../../../../modules/products/controller/factoryController";
import { Course } from "../models/CoursesModel";
import { Video } from "../models/VideosModel";
import { catchError } from "../../../../utils/catchError";
import AppError from "../../../../utils/AppError";
import { Document } from "mongoose";

// ~ Basic Course Operations
export const createCourse = createEntitiy(Course, "Course");
export const getCourse = getEntitiy(Course);
export const getAllCourses = getAllEntitiy(Course);
export const deleteCourse = deleteEntitiy(Course);
export const updateCourse: ReturnType<typeof updateEntitiy> = updateEntitiy(Course);
// ~ Basic Course Operations
// ~ Course Video Operations
export const createVideo = createEntitiy(Video);
export const getVideo = getEntitiy(Video);
export const getAllVideos = getAllEntitiy(Video);
export const deleteVideo = deleteEntitiy(Video);
export const updateVideo: ReturnType<typeof updateEntitiy> = updateEntitiy(Video);
// ~ Course Video Operations
// ~ Advanced Course Management
export const publishCourse = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { courseId } = req.params;
  
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  course.isPublished = true;
  course.publishedAt = new Date();
  await course.save();

  res.status(200).json({
    status: "success",
    message: "Course published successfully",
    data: { course }
  });
});

export const unpublishCourse = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { courseId } = req.params;
  
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  course.isPublished = false;
  course.publishedAt = undefined;
  await course.save();

  res.status(200).json({
    status: "success",
    message: "Course unpublished successfully",
    data: { course }
  });
});

export const addVideoToCourse = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { courseId } = req.params;
  const videoData = req.body;

  const course = await Course.findById(courseId) as (Document & { videos: any[], _id: any });
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  const video = await Video.create({
    ...videoData,
    courseId: course._id
  });

  course.videos.push(video._id);
  await course.save();

  res.status(201).json({
    status: "success",
    message: "Video added to course successfully",
    data: { video, course }
  });
});

export const removeVideoFromCourse = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { courseId, videoId } = req.params;

  const course = await Course.findById(courseId) as (Document & { videos: any[], _id: any });
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  const video = await Video.findById(videoId);
  if (!video) {
    return next(new AppError("Video not found", 404));
  }

  // Remove video ID from course
  course.videos = course.videos.filter(vid => vid.toString() !== videoId);
  await course.save();

  // Delete the video document
  await Video.findByIdAndDelete(videoId);

  res.status(200).json({
    status: "success",
    message: "Video removed from course successfully",
    data: { course }
  });
});
// ~ Advanced Course Management
