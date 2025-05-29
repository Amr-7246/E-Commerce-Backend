"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// ? ################### Type for TS
// ? ################### Data Schema with Data type But for MongoDB 
const studentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
    },
    refreshToken: String,
    phoneNumber: String,
    enrolledCourses: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Course"
        }],
    wishlist: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Course"
        }],
    profileImage: {
        secure_url: String,
        publicId: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});
// ? ################### Data Schema with Data type But for MongoDB 
// ? ################### Auto Populate enrolledCourses and wishlist
studentSchema.pre(/^find/, function (next) {
    // @ts-ignore
    this.populate("enrolledCourses").populate("wishlist");
    next();
});
// ? ################### Auto Populate enrolledCourses and wishlist
// * Method to compare passwords
studentSchema.methods.comparePassword = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
exports.Student = (0, mongoose_1.model)("Student", studentSchema);
