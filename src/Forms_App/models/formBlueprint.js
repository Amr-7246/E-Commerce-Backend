"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormBlueprintModel = void 0;
const mongoose_1 = require("mongoose");
const FormBlueprint = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    structuer: [
        {
            type: {
                type: String,
                required: true,
                enum: ['text', 'textarea', 'email', 'number', 'date', 'select', 'checkbox', 'radio']
            },
            title: { type: String, required: true, trim: true },
            placeholder: { type: String, required: true, trim: true },
            rules: {
                maxLength: { type: Number, required: false, default: 255 },
                minLength: { type: Number, required: false, default: 0 }
            }
        }
    ],
    answers: [
        {
            type: mongoose_1.Schema.Types.Mixed, // Allows for flexible answer types
            required: true
        }
    ]
}, {
    timestamps: true
});
exports.FormBlueprintModel = (0, mongoose_1.model)('FormBlueprint', FormBlueprint);
