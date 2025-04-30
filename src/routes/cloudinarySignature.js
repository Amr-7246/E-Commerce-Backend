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
exports.signature = void 0;
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const GetSignature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = 'PU5o0Qv-7fMuApr_7t4Wm4vKwxM';
    const signatuer = crypto_1.default.createHash('sha1').update(`timestamp=${timestamp}${apiSecret}`).digest('hex');
    res.json({
        signatuer,
        timestamp,
        CloudName: "dnc0bqewd",
        APIKey: 389879165688693
    });
});
const router = express_1.default.Router();
router.get("/", GetSignature);
exports.signature = router;
