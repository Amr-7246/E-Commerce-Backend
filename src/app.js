"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cors_1 = __importDefault(require("cors"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const productRouter_1 = require("./modules/products/routes/productRouter");
const categoryRouter_1 = require("./modules/products/routes/categoryRouter");
const variantsRouter_1 = require("./modules/products/routes/variantsRouter");
const orderRouter_1 = require("./modules/users/routes/orderRouter");
const cloudinarySignature_1 = require("./routes/cloudinarySignature");
const userRouter_1 = require("./modules/users/routes/userRouter");
const authRouter_1 = require("./modules/users/routes/authRouter");
const AppError_1 = __importDefault(require("./utils/AppError"));
const studentsRoutes_1 = require("./Educaion_Hub/modules/students/routes/studentsRoutes");
const teachersRoutes_1 = require("./Educaion_Hub/modules/teachers/routes/teachersRoutes");
const coursesRoutes_1 = require("./Educaion_Hub/modules/courses/routes/coursesRoutes");
const formBlueprint_1 = require("./Forms_App/routes/formBlueprint");
const formDataRoute_1 = require("./Forms_App/routes/formDataRoute");
const bookingRoutes_1 = require("./microServices/Booking_System/routes/bookingRoutes");
// ~ ######################## Setup the wole app 
const app = (0, express_1.default)();
// * Global middlewares
app.use(express_1.default.json()); // & Translator
app.use((0, cookie_parser_1.default)()); // & For Auth
app.use((0, xss_clean_1.default)()); // & Protects against Cross-Site Scripting (XSS) attacks and prevent injection of malicious scripts.
const corsOptions = {
    origin: ['http://localhost:3000', 'https://e-commerce-nu-six-55.vercel.app', 'https://dynamic-forms-theta.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions)); // & allow any frontend req (Not secure I know but it just a project for my portfolio )
app.use((0, express_mongo_sanitize_1.default)()); // & DB security 
app.use(express_1.default.urlencoded({ extended: true })); // & Handel Complex req
// app.use(morgan('dev'));                     // & API req logs
app.use((0, helmet_1.default)()); // & security 
// * Global middlewares
// * Routing middlewares For E-cmmerce App
app.use("/products", productRouter_1.productRouter);
app.use("/cloudinary_signature", cloudinarySignature_1.signature);
app.use("/categories", categoryRouter_1.CategoryRouter);
app.use("/variants", variantsRouter_1.VariantRouter);
app.use("/user", userRouter_1.userRouter);
app.use("/auth", authRouter_1.authRouter);
app.use("/orders", orderRouter_1.OrderRouter);
// * Routing middlewares For E-cmmerce App 
// * Routing middlewares For Education-Hub App
app.use("/courses", coursesRoutes_1.coursesRouter);
app.use("/students", studentsRoutes_1.studentsRouter);
app.use("/teachers", teachersRoutes_1.teachersRouter);
// * Routing middlewares For Education-Hub App
// * Routing middlewares For Forms App
app.use("/forms/blueprint", formBlueprint_1.formBlueprintRouter);
app.use("/forms/data", formDataRoute_1.formDataRouter);
// * Routing middlewares For Forms App
// * Routing middlewares For Booking System
app.use("/book", bookingRoutes_1.bookingRouter);
// * Routing middlewares For Booking System
app.all("*", (req, res, next) => {
    next(new AppError_1.default(`Sorry pro, But We Can't find ${req.originalUrl} on this server`, 404));
});
// ~ ######################## Setup the wole app 
exports.default = app;
