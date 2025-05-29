"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formDataRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
router.route('/')
    .get(controller_1.getAllFormData)
    .post(controller_1.pushFormData);
router.route('/:id')
    .get(controller_1.getFormData)
    .patch(controller_1.updateFormData)
    .delete(controller_1.deleteFormData);
exports.formDataRouter = router;
