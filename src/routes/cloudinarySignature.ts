import express from "express";
import { GetSignature } from "@src/services/GetSignature";

const router = express.Router(); 
router.get("/", GetSignature);
export const signature = router