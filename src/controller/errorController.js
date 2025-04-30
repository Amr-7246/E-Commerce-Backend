"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
/**
 * Handles MongoDB CastErrors for invalid IDs or paths.
 * @param err - The MongoDB CastError object
 */
const handleCastErrorDB = (err) => {
    const message = `Invalid  ${err.path}: ${err.value}.`;
    //create new instance of the AppError class (object) and passing the message and status code
    return new AppError_1.default(message, 400);
};
/**
 * Handles duplicate fields in MongoDB.
 * @param err - The MongoDB Duplicate Key Error object
 */
const handleDuplicateFieldsDB = (err) => {
    const value = Object.values(err.keyValue).join(", ");
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError_1.default(message, 400);
};
/**
 * Handles validation errors from Mongoose.
 * @param err - The Mongoose ValidationError object
 */
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError_1.default(message, 400);
};
/**
 * Handles errors during development.
 * @param err - The error object
 * @param res - The response object
 */
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
/**
 * Handles errors during production.
 * @param err - The error object
 * @param res - The response object
 */
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        console.error("ERROR 💥", err);
        res.status(500).json({
            status: "error",
            message: "Something went wrong!",
        });
    }
};
const globalErrorHandler = (err, req, res, next) => {
    /*sets the statusCode and status properties of the error object to default values if they're not already set.
    This ensures that every error has a status code and a status message. */
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    console.log(err);
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === "production") {
        let error = Object.assign({}, err);
        if (err.name === "CastError")
            error = handleCastErrorDB(err);
        if (err.code === 11000)
            error = handleDuplicateFieldsDB(err);
        if (err._message === "Validation failed")
            error = handleValidationErrorDB(err);
        sendErrorProd(error, res);
    }
};
exports.default = globalErrorHandler;
