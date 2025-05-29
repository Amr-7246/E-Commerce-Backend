import express from "express";
import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  publishCourse,
  unpublishCourse,
  addVideoToCourse,
  removeVideoFromCourse,
  createVideo,
  getVideo,
  getAllVideos,
  updateVideo,
  deleteVideo
} from "../controller";

const router = express.Router();

// Basic course routes
router.route("/")
  .get(getAllCourses)
  .post(createCourse);

router.route("/:id")
  .get(getCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

// Course management routes
router.route("/:courseId/publish")
  .post(publishCourse);

router.route("/:courseId/unpublish")
  .post(unpublishCourse);

// Video management routes
router.route("/:courseId/videos")
  .get(getAllVideos)
  .post(addVideoToCourse);

router.route("/:courseId/videos/:videoId")
  .get(getVideo)
  .patch(updateVideo)
  .delete(removeVideoFromCourse);

export const coursesRouter = router;