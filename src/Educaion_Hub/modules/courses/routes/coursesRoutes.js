"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
// Basic course routes
router.route("/")
    .get(controller_1.getAllCourses)
    .post(controller_1.createCourse);
router.route("/:id")
    .get(controller_1.getCourse)
    .patch(controller_1.updateCourse)
    .delete(controller_1.deleteCourse);
// Course management routes
router.route("/:courseId/publish")
    .post(controller_1.publishCourse);
router.route("/:courseId/unpublish")
    .post(controller_1.unpublishCourse);
// Video management routes
router.route("/:courseId/videos")
    .get(controller_1.getAllVideos)
    .post(controller_1.addVideoToCourse);
router.route("/:courseId/videos/:videoId")
    .get(controller_1.getVideo)
    .patch(controller_1.updateVideo)
    .delete(controller_1.removeVideoFromCourse);
exports.coursesRouter = router;
