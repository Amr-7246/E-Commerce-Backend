"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
router.route('/').get(controller_1.getAllVideos).post(controller_1.createVideo);
router.route('/:id').get(controller_1.getVideo).post().delete(controller_1.deleteVideo).patch(controller_1.updateVideo);
