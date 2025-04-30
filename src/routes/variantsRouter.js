"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantRouter = void 0;
const express_1 = __importDefault(require("express"));
const variantsController_1 = require("../controller/variantsController");
const router = express_1.default.Router();
router.route("/").get(variantsController_1.getAllVariants).post(variantsController_1.createVariant);
router.route("/:id").get(variantsController_1.getVariant).patch(variantsController_1.updateVariant).delete(variantsController_1.deleteVariant);
exports.VariantRouter = router;
