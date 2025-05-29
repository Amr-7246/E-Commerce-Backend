import express from "express";
import {
  getAllTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  addCourseToTeacher,
  removeCourseFromTeacher,
  updateTeacherRating
} from "../controller";

const router = express.Router();

// Basic CRUD routes
router.route("/")
  .get(getAllTeachers)
  .post(createTeacher);

router.route("/:id")
  .get(getTeacher)
  .patch(updateTeacher)
  .delete(deleteTeacher);

// Course management routes
router.route("/:teacherId/courses/:courseId")
  .post(addCourseToTeacher)
  .delete(removeCourseFromTeacher);

// Rating route
router.route("/:teacherId/rating")
  .patch(updateTeacherRating);

export const teachersRouter = router;
