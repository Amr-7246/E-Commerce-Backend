"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    image: { secure_url: String, publicId: String },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Category = (0, mongoose_1.model)("Category", categorySchema);
