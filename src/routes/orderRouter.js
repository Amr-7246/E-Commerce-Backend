"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controller/orderController");
const router = express_1.default.Router();
router.route("/").get(orderController_1.getAllOrders).post(orderController_1.createOrder);
router.route("/:id").get(orderController_1.getOrder).patch(orderController_1.updateOrder).delete(orderController_1.deleteOrder);
exports.OrderRouter = router;
