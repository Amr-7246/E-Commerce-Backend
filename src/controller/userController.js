"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCart = exports.addToCart = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const userModel_1 = require("../models/userModel");
const catchError_1 = require("../utils/catchError");
const factoryController_1 = require("./factoryController");
const mongoose_1 = __importDefault(require("mongoose"));
exports.getAllUsers = (0, factoryController_1.getAllEntitiy)(userModel_1.User);
exports.getUser = (0, factoryController_1.getEntitiy)(userModel_1.User);
exports.createUser = (0, factoryController_1.createEntitiy)(userModel_1.User);
exports.updateUser = (0, factoryController_1.updateEntitiy)(userModel_1.User);
exports.deleteUser = (0, factoryController_1.deleteEntitiy)(userModel_1.User);
exports.addToCart = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { productId, newCount } = req.body;
    console.log(user, productId);
    const cartItem = user.cart.find((p) => { var _a; return ((_a = p === null || p === void 0 ? void 0 : p.productId) === null || _a === void 0 ? void 0 : _a.toString()) === productId; });
    if (cartItem) {
        user.cart = user.cart.map((c) => (c.productId.toString() === productId ? Object.assign(Object.assign({}, c), { quantity: newCount }) : c));
    }
    else {
        user.cart.push({ productId: new mongoose_1.default.Types.ObjectId(productId), quantity: 1 });
    }
    yield user.save();
    res.status(200).json({ data: { user: user }, status: "success", message: "Product added to cart" });
}));
//@ts-ignore
exports.removeFromCart = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { productId, newCount } = req.body;
    const cartItem = user.cart.find((c) => c.productId.toString() === productId);
    if (!cartItem) {
        return res.status(404).json({ status: "error", message: "Product not found in cart" });
    }
    if (cartItem.quantity > 1) {
        user.cart = user.cart.map((c) => c.productId.toString() === productId ? { productId: c.productId, quantity: newCount } : c);
    }
    else {
        user.cart = user.cart.filter((c) => c.productId.toString() !== productId);
    }
    yield user.save();
    res.status(200).json({ data: { user }, status: "success", message: "Product removed from cart" });
}));
