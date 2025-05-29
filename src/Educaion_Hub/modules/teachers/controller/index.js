"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeacherRating = exports.removeCourseFromTeacher = exports.addCourseToTeacher = exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = exports.getTeacher = exports.getAllTeachers = void 0;
const factoryController_1 = require("../../../../modules/products/controller/factoryController");
const TeachersModel_1 = require("../models/TeachersModel");
const catchError_1 = require("../../../../utils/catchError");
const AppError_1 = __importDefault(require("../../../../utils/AppError"));
// ~ ############### Basic CRUD Operations
exports.getAllTeachers = (0, factoryController_1.getAllEntitiy)(TeachersModel_1.Teacher);
exports.getTeacher = (0, factoryController_1.getEntitiy)(TeachersModel_1.Teacher);
exports.createTeacher = (0, factoryController_1.createEntitiy)(TeachersModel_1.Teacher);
exports.updateTeacher = (0, factoryController_1.updateEntitiy)(TeachersModel_1.Teacher);
exports.deleteTeacher = (0, factoryController_1.deleteEntitiy)(TeachersModel_1.Teacher);
// ~ ############### Basic CRUD Operations
// ~ ############### Add Course to Teacher
exports.addCourseToTeacher = (0, catchError_1.catchError)(async (req, res, next) => {
    var _a, _b;
    const { teacherId, courseId } = req.params;
    const teacher = await TeachersModel_1.Teacher.findById(teacherId);
    if (!teacher) {
        return next(new AppError_1.default("No teacher found with this ID", 404));
    }
    //* Check if course already assigned
    if ((_a = teacher.courses) === null || _a === void 0 ? void 0 : _a.includes(courseId)) {
        return next(new AppError_1.default("Course already assigned to this teacher", 400));
    }
    (_b = teacher.courses) === null || _b === void 0 ? void 0 : _b.push(courseId);
    await teacher.save();
    res.status(200).json({
        status: "success",
        message: "Successfully added course to teacher",
        data: { teacher }
    });
});
// ~ ############### Add Course to Teacher
// ~ ############### Remove Course from Teacher
exports.removeCourseFromTeacher = (0, catchError_1.catchError)(async (req, res, next) => {
    var _a;
    const { teacherId, courseId } = req.params;
    const teacher = await TeachersModel_1.Teacher.findById(teacherId);
    if (!teacher) {
        return next(new AppError_1.default("No teacher found with this ID", 404));
    }
    if (!((_a = teacher.courses) === null || _a === void 0 ? void 0 : _a.includes(courseId))) {
        return next(new AppError_1.default("Course not assigned to this teacher", 400));
    }
    teacher.courses = teacher.courses.filter(id => id.toString() !== courseId);
    await teacher.save();
    res.status(200).json({
        status: "success",
        message: "Successfully removed course from teacher",
        data: { teacher }
    });
});
// ~ ############### Remove Course from Teacher
// ~ ############### Update Teacher Rating
exports.updateTeacherRating = (0, catchError_1.catchError)(async (req, res, next) => {
    const { teacherId } = req.params;
    const { rating } = req.body;
    if (rating < 0 || rating > 5) {
        return next(new AppError_1.default("Rating must be between 0 and 5", 400));
    }
    const teacher = await TeachersModel_1.Teacher.findById(teacherId);
    if (!teacher) {
        return next(new AppError_1.default("No teacher found with this ID", 404));
    }
    teacher.rating = rating;
    await teacher.save();
    res.status(200).json({
        status: "success",
        message: "Successfully updated teacher rating",
        data: { teacher }
    });
});
// ~ ############### Update Teacher Rating
