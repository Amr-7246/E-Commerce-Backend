"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
// ? ################### Type for TS
// ? ################### Data Schema with Data type But for MongoDB 
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, min: 10 },
    recommended: { type: Boolean },
    SellNum: { type: Number },
    Rate: { type: Number },
    images: {
        type: [
            {
                secure_url: { type: String, required: false },
                publicId: { type: String, required: false },
            },
        ],
        required: false,
    },
    variants: [
        {
            options: [{ name: String, value: String }],
            images: {
                type: [
                    {
                        secure_url: { type: String, required: false },
                        publicId: { type: String, required: false },
                    },
                ],
                required: false,
            },
            price: { type: Number, required: false },
            inventory: { type: Number, required: false },
        },
    ],
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    shortDesc: { type: String },
    inventory: { type: Number, required: false }
});
// ? ################### Data Schema with Data type But for MongoDB 
// ? ################### Auto Category populate 
productSchema.pre(/^find/, function (next) {
    // @ts-ignore
    this.populate("category");
    next();
});
// ? ################### Auto Category populate 
exports.Product = (0, mongoose_1.model)("Product", productSchema);
