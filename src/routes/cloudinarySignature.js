"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signature = void 0;
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const GetSignature = async (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = 'PU5o0Qv-7fMuApr_7t4Wm4vKwxM';
    const signatuer = crypto_1.default.createHash('sha1').update(`timestamp=${timestamp}${apiSecret}`).digest('hex');
    res.json({
        signatuer,
        timestamp,
        CloudName: "dnc0bqewd",
        APIKey: 389879165688693
    });
};
const router = express_1.default.Router();
router.get("/", GetSignature);
exports.signature = router;
