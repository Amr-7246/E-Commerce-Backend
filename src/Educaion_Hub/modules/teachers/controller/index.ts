import { Request, Response, NextFunction } from "express";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "../../../../modules/products/controller/factoryController";
import { Teacher } from "../models/TeachersModel";
import { catchError } from "../../../../utils/catchError";
import AppError from "../../../../utils/AppError";

// ~ ############### Basic CRUD Operations
export const getAllTeachers = getAllEntitiy(Teacher);
export const getTeacher = getEntitiy(Teacher);
export const createTeacher = createEntitiy(Teacher);
export const updateTeacher = updateEntitiy(Teacher);
export const deleteTeacher = deleteEntitiy(Teacher);
// ~ ############### Basic CRUD Operations

// ~ ############### Add Course to Teacher
export const addCourseToTeacher = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { teacherId, courseId } = req.params;

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    return next(new AppError("No teacher found with this ID", 404));
  }

  //* Check if course already assigned
  if (teacher.courses?.includes(courseId as any)) {
    return next(new AppError("Course already assigned to this teacher", 400));
  }

  teacher.courses?.push(courseId as any);
  await teacher.save();

  res.status(200).json({
    status: "success",
    message: "Successfully added course to teacher",
    data: { teacher }
  });
});
// ~ ############### Add Course to Teacher

// ~ ############### Remove Course from Teacher
export const removeCourseFromTeacher = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { teacherId, courseId } = req.params;

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    return next(new AppError("No teacher found with this ID", 404));
  }

  if (!teacher.courses?.includes(courseId as any)) {
    return next(new AppError("Course not assigned to this teacher", 400));
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
export const updateTeacherRating = catchError(async (req: Request, res: Response, next: NextFunction) => {
  const { teacherId } = req.params;
  const { rating } = req.body;

  if (rating < 0 || rating > 5) {
    return next(new AppError("Rating must be between 0 and 5", 400));
  }

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) {
    return next(new AppError("No teacher found with this ID", 404));
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
