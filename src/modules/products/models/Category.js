"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
// ? ################### Type for TS
// ? ################### Data Schema with Data type But for MongoDB 
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: false,
    },
    slug: {
        type: String,
        required: false,
        unique: false,
    },
    description: String,
    image: { secure_url: String, publicId: String },
    isActive: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: false,
});
// ? ################### Data Schema with Data type But for MongoDB 
exports.Category = (0, mongoose_1.model)("Category", categorySchema);
