import express from "express";
import {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  enrollInCourse,
  addToWishlist,
  removeFromWishlist
} from "../controller";

const router = express.Router();

// Basic CRUD routes
router.route("/")
  .get(getAllStudents)
  .post(createStudent);

router.route("/:id")
  .get(getStudent)
  .patch(updateStudent)
  .delete(deleteStudent);

// Course enrollment routes
router.route("/:studentId/enroll/:courseId")
  .post(enrollInCourse);

// Wishlist routes
router.route("/:studentId/wishlist/:courseId")
  .post(addToWishlist)
  .delete(removeFromWishlist);

export const studentsRouter = router;
