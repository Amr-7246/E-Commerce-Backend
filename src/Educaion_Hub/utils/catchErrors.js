"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const catchError = (fn) => {
    return async (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.catchError = catchError;
