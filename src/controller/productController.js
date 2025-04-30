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
exports.deleteVariant = exports.updateVariant = exports.addNewVariant = exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.getProduct = exports.createProduct = void 0;
const models_1 = require("../models");
const catchError_1 = require("../utils/catchError");
const factoryController_1 = require("./factoryController");
const AppError_1 = __importDefault(require("../utils/AppError"));
exports.createProduct = (0, factoryController_1.createEntitiy)(models_1.Product);
exports.getProduct = (0, factoryController_1.getEntitiy)(models_1.Product);
exports.getAllProducts = (0, factoryController_1.getAllEntitiy)(models_1.Product);
exports.updateProduct = (0, factoryController_1.updateEntitiy)(models_1.Product);
exports.deleteProduct = (0, factoryController_1.deleteEntitiy)(models_1.Product);
exports.addNewVariant = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield models_1.Product.findByIdAndUpdate(id, { $push: { variants: req.body } }, {
        runValidators: true,
        new: true,
    });
    if (!product)
        return next(new AppError_1.default("No product found with this id", 404));
    res.status(200).json({ data: { product }, message: "variant added successfully to the product  !" });
}));
exports.updateVariant = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, variantId } = req.params;
    const updatedProduct = yield models_1.Product.findOneAndUpdate({ _id: id, "variants._id": variantId }, { $set: { "variants.$": req.body } }, { runValidators: true, new: true });
    if (!updatedProduct)
        return next(new AppError_1.default("No product or variant found with this ID", 404));
    res.status(200).json({
        data: { product: updatedProduct },
        message: "Variant updated successfully!",
    });
}));
exports.deleteVariant = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield models_1.Product.findByIdAndUpdate(req.params.id, { $pull: { variants: { _id: req.params.variantId } } }, { new: true });
    if (!product)
        return next(new AppError_1.default("No product found with this id", 404));
    res.status(204).json({ message: "succsessfully deleted", data: { product } });
}));
