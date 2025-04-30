import express from "express";
import { GetSignature } from "../controller/GetSignature";

const router = express.Router(); 
router.get("/", GetSignature);
export const signature = router