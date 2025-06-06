"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const server_1 = require("./graphql/server");
dotenv_1.default.config();
const DB_URI = process.env.MONGO_CONECTION_URL || "";
mongoose_1.default
    .connect(DB_URI)
    .then(() => console.log("Ok Amr MongoDB Connected succesfuly now without any errors"))
    .catch((err) => console.log(err));
const port = process.env.PORT || 5000;
const SERVER_START_MSG = ('Ok Amr, Your server started without any errors on port: ' + port);
const server = app_1.default.listen(port, () => console.log(SERVER_START_MSG));
// * Config For Qraph Ql APIs
async function startServer() {
    await (0, server_1.setupGraphQLServer)(app_1.default);
}
// * Config For Qraph Ql APIs
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
startServer();
