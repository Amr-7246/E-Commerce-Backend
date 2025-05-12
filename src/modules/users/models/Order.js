"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
// ? ########### Data type for TS 
// ? ########### Data type for MongoDB 
const orderSchema = new mongoose_1.Schema({
    customer: {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: Number, required: false },
        address: { type: String, required: false },
    },
    items: [
        {
            product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: false },
            variant: {
                options: [{ name: String, value: String }],
                images: [
                    {
                        secure_url: { type: String, required: false },
                        publicId: { type: String, required: false },
                    },
                ],
                price: { type: Number, required: false },
            },
            quantity: { type: Number, required: false, min: 1 },
            subtotal: { type: Number, required: false },
        },
    ],
    totalAmount: { type: Number, required: false },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
}, { timestamps: true });
// ? ########### Data type for MongoDB 
orderSchema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate("customer").populate("seller").populate("items.product");
    next();
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
