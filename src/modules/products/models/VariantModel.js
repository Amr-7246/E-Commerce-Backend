"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const mongoose_1 = require("mongoose");
// ? ################### Type for TS
// ? ################### Data Schema with Data type But for MongoDB 
const variantTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: false, unique: false },
    options: [{ type: String, required: false }],
}, { timestamps: true });
// ? ################### Data Schema with Data type But for MongoDB 
exports.Variant = (0, mongoose_1.model)("Variant", variantTypeSchema);
