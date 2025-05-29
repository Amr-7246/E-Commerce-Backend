import express from "express";
import { createVideo, deleteVideo, getAllVideos, getVideo, updateVideo } from "../controller"

const router = express.Router();

router.route('/').get(getAllVideos).post(createVideo)
router.route('/:id').get(getVideo).post().delete(deleteVideo).patch(updateVideo)