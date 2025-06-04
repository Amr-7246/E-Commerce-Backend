"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller");
const router = express_1.default.Router();
router.route('/')
    .get(controller_1.getAllBookings)
    .post(controller_1.createBooking);
router.route('/:id')
    .get(controller_1.getBooking)
    .patch(controller_1.updateBooking)
    .delete(controller_1.deleteBooking);
exports.bookingRouter = router;
