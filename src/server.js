"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jet_logger_1 = __importDefault(require("jet-logger"));
const ENV_1 = __importDefault(require("@src/constants/ENV"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const SERVER_START_MSG = ('Ok Amr, Your server started without any errors on port: ' + ENV_1.default.Port.toString());
(0, db_1.default)().then(() => {
    app_1.default.listen(ENV_1.default.Port, () => jet_logger_1.default.info(SERVER_START_MSG));
});
