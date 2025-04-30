import express from "express";
import crypto from 'crypto';
import { Request, Response } from 'express'

const GetSignature = async ( req : Request , res : Response ) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const apiSecret = 'PU5o0Qv-7fMuApr_7t4Wm4vKwxM'
    const signatuer = crypto.createHash('sha1').update(`timestamp=${timestamp}${apiSecret}`).digest('hex')

    res.json({
            signatuer , 
            timestamp,
            CloudName: "dnc0bqewd" ,
            APIKey: 389879165688693
        })
}

const router = express.Router(); 
router.get("/", GetSignature);
export const signature = router