"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const mongoose_1 = require("mongoose");
const variantTypeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    options: [{ type: String, required: true }],
}, { timestamps: true });
exports.Variant = (0, mongoose_1.model)("Variant", variantTypeSchema);
