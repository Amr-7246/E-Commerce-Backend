"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGO_CONECTION_URL);
        console.log(`Super good Amr, Your MongoDB Now connected succesfully At that Host : ${conn.connection.host}`);
    }
    catch (error) {
        console.error(" Sorry Amr, But we finde a MongoDB connection error And here is it . . . ", error);
        process.exit(1); // * Exit app if DB fails
    }
};
exports.default = connectDB;
