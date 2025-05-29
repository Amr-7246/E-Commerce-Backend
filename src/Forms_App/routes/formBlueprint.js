"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formBlueprintRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const submitAnswers_1 = require("../controller/submitAnswers");
const router = express_1.default.Router();
router.route('/')
    .get(controller_1.getAllFormBluprints)
    .post(controller_1.createFormBluprint);
router.route('/:id')
    .get(controller_1.getFormBluprint)
    .patch(controller_1.updateFormBluprint)
    .delete(controller_1.deleteFormBluprint);
router.post('/submit/:id', submitAnswers_1.submitFormAnswers);
exports.formBlueprintRouter = router;
