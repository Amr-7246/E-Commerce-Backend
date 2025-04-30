import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import xss from "xss-clean";

import BaseRouter from '@src/routes';
import Paths from '@src/constants/Paths';
import ENV from '@src/constants/ENV';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { RouteError } from '@src/util/route-errors';
import { NodeEnvs } from '@src/constants';

import { productRouter } from './modules/products/routes/productRouter';
import { CategoryRouter } from './modules/products/routes/categoryRouter';
import { VariantRouter } from './modules/products/routes/variantsRouter';
import { OrderRouter } from './modules/users/routes/orderRouter';
import AppError from './util/AppError';
import corsOptions from './config/corsOptions';
import { signature } from './routes/cloudinarySignature';
import { userRouter } from './modules/users/routes/userRouter';
import { authRouter } from './modules/users/routes/authRouter';

// BE Frist Step 

// ~ ######################## Setup the wole app 
  const app = express();
  
  // * Global middlewares
    app.use(express.json());                       // & Translator
    app.use(cookieParser());                       // & For Auth
    app.use(xss());                                // & Protects against Cross-Site Scripting (XSS) attacks and prevent injection of malicious scripts.
    app.use(cors(corsOptions));                    // & Just allow Who have the permision 
    app.use(mongoSanitize());                      // & DB security 
    app.use(express.urlencoded({extended: true})); // & Handel Complex req

    if (ENV.NodeEnv === NodeEnvs.Dev) {
      app.use(morgan('dev'));                      // & API req logs
    }
    if (ENV.NodeEnv === NodeEnvs.Production) {
      if (!process.env.DISABLE_HELMET) {
        app.use(helmet());                         // & security 
      }
    }
  // * Global middlewares

  // * Routing middlewares
    app.use(Paths.Base, BaseRouter);
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

  // * Global error handler
    app.use((err: Error , _: Request , res: Response, next: NextFunction) => {
      if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
        logger.err(err, true);
      }
      let status = HttpStatusCodes.BAD_REQUEST;
      if (err instanceof RouteError) {
        status = err.status;
        res.status(status).json({ error: err.message });
      }
      return next(err);

    });
  // * Global error handler
// ~ ######################## Setup the wole app 
// ~ #################### front end Handling 
  // * Set directories (html) (js and css).
    const viewsDir = path.join(__dirname, 'views');
    app.set('views', viewsDir);
    
    const staticDir = path.join(__dirname, 'public');
    app.use(express.static(staticDir));
  // * Set directories (html) (js and css).

  // * Nav to users pg by default
    app.get('/', (_: Request, res: Response) => {
      return res.redirect('/users');
    });
  // * Nav to users pg by default

  // * Redirect to login if not logged in.
    app.get('/users', (_: Request, res: Response) => {
      return res.sendFile('users.html', { root: viewsDir });
    });
  // * Redirect to login if not logged in.
// ~ #################### front end Handling 

export default app;
