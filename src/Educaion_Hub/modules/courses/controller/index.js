"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVideoFromCourse = exports.addVideoToCourse = exports.unpublishCourse = exports.publishCourse = exports.updateVideo = exports.deleteVideo = exports.getAllVideos = exports.getVideo = exports.createVideo = exports.updateCourse = exports.deleteCourse = exports.getAllCourses = exports.getCourse = exports.createCourse = void 0;
const factoryController_1 = require("../../../../modules/products/controller/factoryController");
const CoursesModel_1 = require("../models/CoursesModel");
const VideosModel_1 = require("../models/VideosModel");
const catchError_1 = require("../../../../utils/catchError");
const AppError_1 = __importDefault(require("../../../../utils/AppError"));
// ~ Basic Course Operations
exports.createCourse = (0, factoryController_1.createEntitiy)(CoursesModel_1.Course, "Course");
exports.getCourse = (0, factoryController_1.getEntitiy)(CoursesModel_1.Course);
exports.getAllCourses = (0, factoryController_1.getAllEntitiy)(CoursesModel_1.Course);
exports.deleteCourse = (0, factoryController_1.deleteEntitiy)(CoursesModel_1.Course);
exports.updateCourse = (0, factoryController_1.updateEntitiy)(CoursesModel_1.Course);
// ~ Basic Course Operations
// ~ Course Video Operations
exports.createVideo = (0, factoryController_1.createEntitiy)(VideosModel_1.Video);
exports.getVideo = (0, factoryController_1.getEntitiy)(VideosModel_1.Video);
exports.getAllVideos = (0, factoryController_1.getAllEntitiy)(VideosModel_1.Video);
exports.deleteVideo = (0, factoryController_1.deleteEntitiy)(VideosModel_1.Video);
exports.updateVideo = (0, factoryController_1.updateEntitiy)(VideosModel_1.Video);
// ~ Course Video Operations
// ~ Advanced Course Management
exports.publishCourse = (0, catchError_1.catchError)(async (req, res, next) => {
    const { courseId } = req.params;
    const course = await CoursesModel_1.Course.findById(courseId);
    if (!course) {
        return next(new AppError_1.default("Course not found", 404));
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
exports.unpublishCourse = (0, catchError_1.catchError)(async (req, res, next) => {
    const { courseId } = req.params;
    const course = await CoursesModel_1.Course.findById(courseId);
    if (!course) {
        return next(new AppError_1.default("Course not found", 404));
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
exports.addVideoToCourse = (0, catchError_1.catchError)(async (req, res, next) => {
    const { courseId } = req.params;
    const videoData = req.body;
    const course = await CoursesModel_1.Course.findById(courseId);
    if (!course) {
        return next(new AppError_1.default("Course not found", 404));
    }
    const video = await VideosModel_1.Video.create(Object.assign(Object.assign({}, videoData), { courseId: course._id }));
    course.videos.push(video._id);
    await course.save();
    res.status(201).json({
        status: "success",
        message: "Video added to course successfully",
        data: { video, course }
    });
});
exports.removeVideoFromCourse = (0, catchError_1.catchError)(async (req, res, next) => {
    const { courseId, videoId } = req.params;
    const course = await CoursesModel_1.Course.findById(courseId);
    if (!course) {
        return next(new AppError_1.default("Course not found", 404));
    }
    const video = await VideosModel_1.Video.findById(videoId);
    if (!video) {
        return next(new AppError_1.default("Video not found", 404));
    }
    // Remove video ID from course
    course.videos = course.videos.filter(vid => vid.toString() !== videoId);
    await course.save();
    // Delete the video document
    await VideosModel_1.Video.findByIdAndDelete(videoId);
    res.status(200).json({
        status: "success",
        message: "Video removed from course successfully",
        data: { course }
    });
});
// ~ Advanced Course Management
