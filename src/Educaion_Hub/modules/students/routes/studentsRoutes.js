"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
// Basic CRUD routes
router.route("/")
    .get(controller_1.getAllStudents)
    .post(controller_1.createStudent);
router.route("/:id")
    .get(controller_1.getStudent)
    .patch(controller_1.updateStudent)
    .delete(controller_1.deleteStudent);
// Course enrollment routes
router.route("/:studentId/enroll/:courseId")
    .post(controller_1.enrollInCourse);
// Wishlist routes
router.route("/:studentId/wishlist/:courseId")
    .post(controller_1.addToWishlist)
    .delete(controller_1.removeFromWishlist);
exports.studentsRouter = router;
