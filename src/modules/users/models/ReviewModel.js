"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    title: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    isVerifiedPurchase: {
        type: Boolean,
        default: false,
    },
    helpfulVotes: {
        type: Number,
        default: 0,
    },
    images: [String],
}, {
    timestamps: true,
});
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
