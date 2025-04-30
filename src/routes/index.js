"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Paths_1 = __importDefault(require("@src/constants/Paths"));
const UserRoutes_1 = __importDefault(require("./UserRoutes"));
/******************************************************************************
                                Setup
******************************************************************************/
const apiRouter = (0, express_1.Router)();
// ** Add UserRouter ** //
// Init router
const userRouter = (0, express_1.Router)();
// Get all users
userRouter.get(Paths_1.default.Users.Get, UserRoutes_1.default.getAll);
userRouter.post(Paths_1.default.Users.Add, UserRoutes_1.default.add);
userRouter.put(Paths_1.default.Users.Update, UserRoutes_1.default.update);
userRouter.delete(Paths_1.default.Users.Delete, UserRoutes_1.default.delete);
// Add UserRouter
apiRouter.use(Paths_1.default.Users.Base, userRouter);
/******************************************************************************
                                Export default
******************************************************************************/
exports.default = apiRouter;
