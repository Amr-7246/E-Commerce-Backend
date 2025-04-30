"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, min: 10 },
    images: {
        type: [
            {
                secure_url: { type: String, required: true },
                publicId: { type: String, required: true },
            },
        ],
        required: true,
    },
    variants: [
        {
            options: [{ name: String, value: String }],
            images: {
                type: [
                    {
                        secure_url: { type: String, required: true },
                        publicId: { type: String, required: true },
                    },
                ],
                required: true, // ✅ Applied to the array
            },
            price: { type: Number, required: true },
            inventory: { type: Number, required: true },
        },
    ],
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category" },
    shortDesc: { type: String },
});
productSchema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate("category");
    next();
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
