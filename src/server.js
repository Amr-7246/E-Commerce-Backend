"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const DB_URI = process.env.DATABASE_URI || "";
mongoose_1.default
    .connect(DB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
const port = process.env.PORT || 3000;
const server = app_1.default.listen(port);
// async function triggerUnhandledRejection() {
//   try {
//     throw new Error("This is an unhandled rejection using async/await!");
//   } catch (error) {
//     console.log(error);
//   }
// }
// triggerUnhandledRejection();
// No try-catch or `.catch()` to handle the rejection, triggering the event.
/*
The process object in Node.js is a global object that provides information about and control over the current Node.js process.
The .on() method is used to attach a listener to a specific event emitted by the process.
this case, the event is "unhandledRejection", and the listener is a function that will handle the event.
 */
process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
