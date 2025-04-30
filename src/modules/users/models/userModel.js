"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// ? ########### Data type for TS 
// ? ########### Data type for MongoDB 
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false, select: false },
    createdAt: { type: Date, default: Date.now },
    passwordChangeAt: { type: Date },
    isAdmin: { type: Boolean, default: false },
    refreshToken: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    active: { type: Boolean, default: true },
    age: { type: Number },
    image: {
        secure_url: { type: String },
        publicId: { type: String },
    },
    cart: [{ productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }, quantity: Number }],
}, { timestamps: true });
// ? ########### Data type for MongoDB 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt_1.default.hash(this.password, 12);
    next();
});
// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
exports.User = (0, mongoose_1.model)("User", userSchema);
