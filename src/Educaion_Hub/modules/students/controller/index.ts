import { Request, Response, NextFunction } from "express";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "../../../../modules/products/controller/factoryController";
import { Student } from "../models/StudentsModel";
import { catchError } from "../../../../utils/catchError";
import AppError from "../../../../utils/AppError";

// ~ ############### Basic CRUD Operations
export const getAllStudents = getAllEntitiy(Student);
export const getStudent = getEntitiy(Student);
export const createStudent = createEntitiy(Student);
export const updateStudent = updateEntitiy(Student);
export const deleteStudent = deleteEntitiy(Student);
// ~ ############### Basic CRUD Operations

// ~ ############### Enroll in Course
export const enrollInCourse = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { studentId, courseId } = req.params;
  
  const student = await Student.findById(studentId);
  if (!student) {
    return next(new AppError("No student found with this ID", 404));
  }

  // Check if already enrolled
  if (student.enrolledCourses?.includes(courseId as any)) {
    return next(new AppError("Student already enrolled in this course", 400));
  }

  student.enrolledCourses?.push(courseId as any);
  await student.save();

  res.status(200).json({
    status: "success",
    message: "Successfully enrolled in course",
    data: { student }
  });
});
// ~ ############### Enroll in Course

// ~ ############### Add to Wishlist
export const addToWishlist = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { studentId, courseId } = req.params;

  const student = await Student.findById(studentId);
  if (!student) {
    return next(new AppError("No student found with this ID", 404));
  }

  // Check if already in wishlist
  if (student.wishlist?.includes(courseId as any)) {
    return next(new AppError("Course already in wishlist", 400));
  }

  student.wishlist?.push(courseId as any);
  await student.save();

  res.status(200).json({
    status: "success",
    message: "Successfully added course to wishlist",
    data: { student }
  });
});
// ~ ############### Add to Wishlist

// ~ ############### Remove from Wishlist
export const removeFromWishlist = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { studentId, courseId } = req.params;

  const student = await Student.findById(studentId);
  if (!student) {
    return next(new AppError("No student found with this ID", 404));
  }

  if (!student.wishlist?.includes(courseId as any)) {
    return next(new AppError("Course not in wishlist", 400));
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
