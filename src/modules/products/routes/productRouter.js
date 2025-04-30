"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const router = express_1.default.Router();
router.get("/", productController_1.getAllProducts);
router.route("/").get(productController_1.getAllProducts).post(productController_1.createProduct);
router.route("/:id").get(productController_1.getProduct).patch(productController_1.updateProduct).delete(productController_1.deleteProduct);
// * Variant routes
router.route("/:id/variants").post(productController_1.addNewVariant); // ~ Route params
router.route("/:id/variants/:variantId").patch(productController_1.updateVariant).delete(productController_1.deleteVariant); // ~ Route params
// * Variant routes
exports.productRouter = router;
