"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormData = void 0;
const mongoose_1 = require("mongoose");
const FormDataSchema = new mongoose_1.Schema({
    formTitle: { type: String, required: true, trim: true },
    submissionDate: { type: Date, default: Date.now },
    answers: [{ type: String, required: true }],
    status: { type: String, enum: ['pending', 'reviewed', 'approved', 'rejected'], default: 'pending' }
});
exports.FormData = (0, mongoose_1.model)('FormData', FormDataSchema);
