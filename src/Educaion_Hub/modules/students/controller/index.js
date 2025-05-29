"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromWishlist = exports.addToWishlist = exports.enrollInCourse = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudent = exports.getAllStudents = void 0;
const factoryController_1 = require("../../../../modules/products/controller/factoryController");
const StudentsModel_1 = require("../models/StudentsModel");
const catchError_1 = require("../../../../utils/catchError");
const AppError_1 = __importDefault(require("../../../../utils/AppError"));
// ~ ############### Basic CRUD Operations
exports.getAllStudents = (0, factoryController_1.getAllEntitiy)(StudentsModel_1.Student);
exports.getStudent = (0, factoryController_1.getEntitiy)(StudentsModel_1.Student);
exports.createStudent = (0, factoryController_1.createEntitiy)(StudentsModel_1.Student);
exports.updateStudent = (0, factoryController_1.updateEntitiy)(StudentsModel_1.Student);
exports.deleteStudent = (0, factoryController_1.deleteEntitiy)(StudentsModel_1.Student);
// ~ ############### Basic CRUD Operations
// ~ ############### Enroll in Course
exports.enrollInCourse = (0, catchError_1.catchError)(async (req, res, next) => {
    var _a, _b;
    const { studentId, courseId } = req.params;
    const student = await StudentsModel_1.Student.findById(studentId);
    if (!student) {
        return next(new AppError_1.default("No student found with this ID", 404));
    }
    // Check if already enrolled
    if ((_a = student.enrolledCourses) === null || _a === void 0 ? void 0 : _a.includes(courseId)) {
        return next(new AppError_1.default("Student already enrolled in this course", 400));
    }
    (_b = student.enrolledCourses) === null || _b === void 0 ? void 0 : _b.push(courseId);
    await student.save();
    res.status(200).json({
        status: "success",
        message: "Successfully enrolled in course",
        data: { student }
    });
});
// ~ ############### Enroll in Course
// ~ ############### Add to Wishlist
exports.addToWishlist = (0, catchError_1.catchError)(async (req, res, next) => {
    var _a, _b;
    const { studentId, courseId } = req.params;
    const student = await StudentsModel_1.Student.findById(studentId);
    if (!student) {
        return next(new AppError_1.default("No student found with this ID", 404));
    }
    // Check if already in wishlist
    if ((_a = student.wishlist) === null || _a === void 0 ? void 0 : _a.includes(courseId)) {
        return next(new AppError_1.default("Course already in wishlist", 400));
    }
    (_b = student.wishlist) === null || _b === void 0 ? void 0 : _b.push(courseId);
    await student.save();
    res.status(200).json({
        status: "success",
        message: "Successfully added course to wishlist",
        data: { student }
    });
});
// ~ ############### Add to Wishlist
// ~ ############### Remove from Wishlist
exports.removeFromWishlist = (0, catchError_1.catchError)(async (req, res, next) => {
    var _a;
    const { studentId, courseId } = req.params;
    const student = await StudentsModel_1.Student.findById(studentId);
    if (!student) {
        return next(new AppError_1.default("No student found with this ID", 404));
    }
    if (!((_a = student.wishlist) === null || _a === void 0 ? void 0 : _a.includes(courseId))) {
        return next(new AppError_1.default("Course not in wishlist", 400));
    }
    student.wishlist = student.wishlist.filter(id => id.toString() !== courseId);
    await student.save();
    res.status(200).json({
        status: "success",
        message: "Successfully removed course from wishlist",
        data: { student }
    });
});
// ~ ############### Remove from Wishlist
