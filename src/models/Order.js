"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            product: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
            variant: {
                options: [{ name: String, value: String }],
                images: [
                    {
                        secure_url: { type: String, required: true },
                        publicId: { type: String, required: true },
                    },
                ],
                price: { type: Number, required: true },
            },
            quantity: { type: Number, required: true, min: 1 },
            subtotal: { type: Number, required: true },
        },
    ],
    totalAmount: { type: Number, required: true },
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
orderSchema.pre(/^find/, function (next) {
    //@ts-ignore
    this.populate("customer").populate("seller").populate("items.product");
    next();
});
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
