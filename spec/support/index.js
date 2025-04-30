"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDatabase = cleanDatabase;
exports.parseValidationErr = parseValidationErr;
const UserRepo_1 = __importDefault(require("@src/repos/UserRepo"));
const utils_1 = require("jet-validators/utils");
const jet_validators_1 = require("jet-validators");
/******************************************************************************
                                Functions
******************************************************************************/
/**
 * Delete all records for unit testing.
 */
async function cleanDatabase() {
    await Promise.all([
        UserRepo_1.default.deleteAllUsers(),
    ]);
}
/**
 * JSON parse a validation error.
 */
function parseValidationErr(arg) {
    if (!(0, jet_validators_1.isString)(arg)) {
        throw new Error('Not a string');
    }
    return (0, utils_1.parseJson)(arg);
}
