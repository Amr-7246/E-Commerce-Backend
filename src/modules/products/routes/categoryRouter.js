"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controller/categoryController");
const router = express_1.default.Router();
router.route("/").get(categoryController_1.getAllCategory).post(categoryController_1.createCategory);
router.route("/").get(categoryController_1.getCategory).patch(categoryController_1.updateCategory).delete(categoryController_1.deleteCategory);
exports.CategoryRouter = router;
