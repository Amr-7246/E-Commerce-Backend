"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const mongoose_1 = require("mongoose");
// ? ################### Type for TS
// ? ################### Data Schema with Data type But for MongoDB 
const teacherSchema = new mongoose_1.Schema({
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
    phoneNumber: String,
    specialization: [{
            type: String,
            required: [true, "At least one specialization is required"]
        }],
    bio: String,
    courses: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Course"
        }],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
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
// ? ################### Auto Populate courses
teacherSchema.pre(/^find/, function (next) {
    // @ts-ignore
    this.populate("courses");
    next();
});
// ? ################### Auto Populate courses
exports.Teacher = (0, mongoose_1.model)("Teacher", teacherSchema);
