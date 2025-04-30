"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.protect = exports.checkIfAdmin = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const userModel_1 = require("../models/userModel");
const catchError_1 = require("../utils/catchError");
const JWT_EXPIRES = "10m"; // Short-lived tokens, because who likes long waits? 😜
const REFRESH_TOKEN_EXPIRES = "7d"; // The refresh token gets to hang out a bit longer, 7 days, lucky guy.
// Generate JWT token
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: JWT_EXPIRES,
    });
};
// Cookie options
const cookieOptions = {
    expires: new Date(Date.now() + 3000 * 60 * 60), // 1 hour from now
    httpOnly: true,
    sameSite: "strict", // Can be 'strict', 'lax', or 'none'
    secure: process.env.NODE_ENV === "production", // Only secure cookies in production
};
// Send JWT and refresh token in the response
const sendResponse = (res, user, code) => __awaiter(void 0, void 0, void 0, function* () {
    const token = generateToken(user._id); //access token
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
        expiresIn: REFRESH_TOKEN_EXPIRES,
    });
    if (process.env.NODE_ENV === "production")
        cookieOptions.secure = true;
    // Update user with refresh token
    const updated = yield userModel_1.User.findByIdAndUpdate(user._id, { refreshToken });
    console.log(updated, "Updated");
    res.cookie("jwt", refreshToken, cookieOptions);
    user.password = undefined; // Don’t send password in the response
    res.status(code).json({ status: "success", token, data: { user } });
});
// Register handler
exports.register = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userModel_1.User.create(Object.assign({}, req.body));
    sendResponse(res, newUser, 201);
}));
// Login handler
exports.login = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError_1.default("Please provide email and password", 400));
    const user = yield userModel_1.User.findOne({ email }).select("+password");
    if (!user || !(yield user.comparePassword(password)))
        return next(new AppError_1.default("Incorrect email or password", 401));
    sendResponse(res, user, 200);
}));
exports.checkIfAdmin = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { user } = req;
    console.log(user);
    if (user.role !== "admin")
        return next(new AppError_1.default("You are not an admin", 403));
    else
        next();
}));
exports.protect = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = "";
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token)
        return next(new AppError_1.default("You are not logged in. Please log in to get access", 401));
    console.log(token);
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const currentUser = yield userModel_1.User.findById(decoded.id);
    console.log(decoded);
    if (!currentUser)
        return next(new AppError_1.default("The user belonging to this token does no longer exist", 401));
    //@ts-ignore
    req.user = currentUser;
    next();
}));
// Refresh token handler
exports.refresh = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.jwt;
    console.log(refreshToken);
    if (!refreshToken)
        return next(new AppError_1.default("You are not logged in. Please log in to get access", 401));
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            return next(new AppError_1.default("Refresh token is not valid", 403));
        console.log(decoded);
        const existingUser = yield userModel_1.User.findById(decoded.id);
        console.log(existingUser);
        if (!existingUser)
            return next(new AppError_1.default("Refresh token is not valid", 403));
        const token = generateToken(existingUser._id);
        return res.status(200).json({ status: "success", token, data: { user: existingUser } });
    }));
}));
// Logout handler
exports.logout = (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.jwt) {
        return res.status(204).json({ status: "success" });
    }
    const refreshToken = req.cookies.jwt;
    const user = yield userModel_1.User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("jwt", cookieOptions);
        return res.status(204).json({ status: "success" });
    }
    user.refreshToken = "";
    yield user.save();
    res.clearCookie("jwt", cookieOptions);
    return res.status(200).json({ status: "success" });
}));
