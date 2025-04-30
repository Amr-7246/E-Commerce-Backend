"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const jet_logger_1 = __importDefault(require("jet-logger"));
require("express-async-errors");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cors_1 = __importDefault(require("cors"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const routes_1 = __importDefault(require("@src/routes"));
const Paths_1 = __importDefault(require("@src/constants/Paths"));
const ENV_1 = __importDefault(require("@src/constants/ENV"));
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
const route_errors_1 = require("@src/util/route-errors");
const constants_1 = require("@src/constants");
const productRouter_1 = require("./modules/products/routes/productRouter");
const categoryRouter_1 = require("./modules/products/routes/categoryRouter");
const variantsRouter_1 = require("./modules/products/routes/variantsRouter");
const orderRouter_1 = require("./modules/users/routes/orderRouter");
const AppError_1 = __importDefault(require("./util/AppError"));
const cloudinarySignature_1 = require("./routes/cloudinarySignature");
const userRouter_1 = require("./modules/users/routes/userRouter");
const authRouter_1 = require("./modules/users/routes/authRouter");
// BE Frist Step 
// ~ ######################## Setup the wole app 
const app = (0, express_1.default)();
// * Global middlewares
app.use(express_1.default.json()); // & Translator
app.use((0, cookie_parser_1.default)()); // & For Auth
app.use((0, xss_clean_1.default)()); // & Protects against Cross-Site Scripting (XSS) attacks and prevent injection of malicious scripts.
// app.use(cors(corsOptions));                    // & Just allow Who have the permision 
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));
app.use((0, express_mongo_sanitize_1.default)()); // & DB security 
app.use(express_1.default.urlencoded({ extended: true })); // & Handel Complex req
if (ENV_1.default.NodeEnv === constants_1.NodeEnvs.Dev) {
    app.use((0, morgan_1.default)('dev')); // & API req logs
}
if (ENV_1.default.NodeEnv === constants_1.NodeEnvs.Production) {
    if (!process.env.DISABLE_HELMET) {
        app.use((0, helmet_1.default)()); // & security 
    }
}
// * Global middlewares
// * Routing middlewares
app.use(Paths_1.default.Base, routes_1.default);
app.use("/products", productRouter_1.productRouter);
app.use("/cloudinary_signature", cloudinarySignature_1.signature);
app.use("/categories", categoryRouter_1.CategoryRouter);
app.use("/variants", variantsRouter_1.VariantRouter);
app.use("/user", userRouter_1.userRouter);
app.use("/auth", authRouter_1.authRouter);
app.use("/orders", orderRouter_1.OrderRouter);
app.all("*", (req, res, next) => {
    next(new AppError_1.default(`Sory pro, But We Can't find ${req.originalUrl} on this server`, 404));
});
// * Routing middlewares
// * Global error handler
app.use((err, _, res, next) => {
    if (ENV_1.default.NodeEnv !== constants_1.NodeEnvs.Test.valueOf()) {
        jet_logger_1.default.err(err, true);
    }
    let status = HttpStatusCodes_1.default.BAD_REQUEST;
    if (err instanceof route_errors_1.RouteError) {
        status = err.status;
        res.status(status).json({ error: err.message });
    }
    return next(err);
});
// * Global error handler
// ~ ######################## Setup the wole app 
// ~ #################### front end Handling 
// * Set directories (html) (js and css).
const viewsDir = path_1.default.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path_1.default.join(__dirname, 'public');
app.use(express_1.default.static(staticDir));
// * Set directories (html) (js and css).
// * Nav to users pg by default
app.get('/', (_, res) => {
    return res.redirect('/users');
});
// * Nav to users pg by default
// * Redirect to login if not logged in.
app.get('/users', (_, res) => {
    return res.sendFile('users.html', { root: viewsDir });
});
// * Redirect to login if not logged in.
// ~ #################### front end Handling 
exports.default = app;
