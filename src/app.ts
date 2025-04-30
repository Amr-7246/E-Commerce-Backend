import morgan from 'morgan';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import xss from "xss-clean";

import { productRouter } from './modules/products/routes/productRouter';
import { CategoryRouter } from './modules/products/routes/categoryRouter';
import { VariantRouter } from './modules/products/routes/variantsRouter';
import { OrderRouter } from './modules/users/routes/orderRouter';
import { signature } from './routes/cloudinarySignature';
import { userRouter } from './modules/users/routes/userRouter';
import { authRouter } from './modules/users/routes/authRouter';
import AppError from './utils/AppError';

// ~ ######################## Setup the wole app 
  const app = express();
  
  // * Global middlewares
    app.use(express.json());                       // & Translator
    app.use(cookieParser());                       // & For Auth
    app.use(xss());                                // & Protects against Cross-Site Scripting (XSS) attacks and prevent injection of malicious scripts.
    app.use(cors({                                 // & Just allow Who have the permision 
      origin: process.env.CLIENT_ORIGIN,           
      credentials: true,
    }));
    app.use(mongoSanitize());                      // & DB security 
    app.use(express.urlencoded({extended: true})); // & Handel Complex req
    // app.use(morgan('dev'));                        // & API req logs
    app.use(helmet());                             // & security 
  // * Global middlewares

  // * Routing middlewares
    app.use("/products", productRouter);
    app.use("/cloudinary_signature", signature);
    app.use("/categories", CategoryRouter);
    app.use("/variants", VariantRouter);

    app.use("/user", userRouter);
    app.use("/auth", authRouter );
    app.use("/orders", OrderRouter);

    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(`Sory pro, But We Can't find ${req.originalUrl} on this server`, 404));
    });
  // * Routing middlewares
// ~ ######################## Setup the wole app 
export default app;
