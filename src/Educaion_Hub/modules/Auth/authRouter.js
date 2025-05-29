"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController_1 = require("./authController");
const router = express_1.default.Router();
router.route("/login").post(authController_1.login);
router.route("/signup").post(authController_1.register);
router.route("/refresh").get(authController_1.refresh);
router.route("/logout").post(authController_1.logout);
exports.authRouter = router;
