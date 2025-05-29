"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teachersRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
// Basic CRUD routes
router.route("/")
    .get(controller_1.getAllTeachers)
    .post(controller_1.createTeacher);
router.route("/:id")
    .get(controller_1.getTeacher)
    .patch(controller_1.updateTeacher)
    .delete(controller_1.deleteTeacher);
// Course management routes
router.route("/:teacherId/courses/:courseId")
    .post(controller_1.addCourseToTeacher)
    .delete(controller_1.removeCourseFromTeacher);
// Rating route
router.route("/:teacherId/rating")
    .patch(controller_1.updateTeacherRating);
exports.teachersRouter = router;
