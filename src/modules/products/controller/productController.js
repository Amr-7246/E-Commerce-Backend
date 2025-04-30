"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVariant = exports.updateVariant = exports.addNewVariant = exports.deleteProduct = exports.updateProduct = exports.getAllProducts = exports.getProduct = exports.createProduct = void 0;
const catchError_1 = require("../../../utils/catchError");
const factoryController_1 = require("./factoryController");
const AppError_1 = __importDefault(require("../../../utils/AppError"));
const models_1 = require("../models");
exports.createProduct = (0, factoryController_1.createEntitiy)(models_1.Product);
exports.getProduct = (0, factoryController_1.getEntitiy)(models_1.Product);
exports.getAllProducts = (0, factoryController_1.getAllEntitiy)(models_1.Product);
exports.updateProduct = (0, factoryController_1.updateEntitiy)(models_1.Product);
exports.deleteProduct = (0, factoryController_1.deleteEntitiy)(models_1.Product);
// & ################# addNewVariant
exports.addNewVariant = (0, catchError_1.catchError)(async (req, res, next) => {
    const id = req.params.id;
    const product = await models_1.Product.findByIdAndUpdate(id, { $push: { variants: req.body } }, {
        runValidators: true,
        new: true,
    });
    if (!product)
        return next(new AppError_1.default("No product found with this id", 404));
    res.status(200).json({ data: { product }, message: "variant added successfully to the product  !" });
});
// & ################# addNewVariant
// & ################# updateVariant
exports.updateVariant = (0, catchError_1.catchError)(async (req, res, next) => {
    const { id, variantId } = req.params;
    const updatedProduct = await models_1.Product.findOneAndUpdate({ _id: id, "variants._id": variantId }, { $set: { "variants.$": req.body } }, { runValidators: true, new: true });
    if (!updatedProduct)
        return next(new AppError_1.default("No product or variant found with this ID", 404));
    res.status(200).json({
        data: { product: updatedProduct },
        message: "Variant updated successfully!",
    });
});
// & ################# updateVariant
// & ################# deleteVariant
exports.deleteVariant = (0, catchError_1.catchError)(async (req, res, next) => {
    const product = await models_1.Product.findByIdAndUpdate(req.params.id, { $pull: { variants: { _id: req.params.variantId } } }, { new: true });
    if (!product)
        return next(new AppError_1.default("No product found with this id", 404));
    res.status(204).json({ message: "succsessfully deleted", data: { product } });
});
// & ################# deleteVariant
