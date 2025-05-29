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
import { setupGraphQLServer } from './graphql/server';
import { studentsRouter } from './Educaion_Hub/modules/students/routes/studentsRoutes';
import { teachersRouter } from './Educaion_Hub/modules/teachers/routes/teachersRoutes';
import { coursesRouter } from './Educaion_Hub/modules/courses/routes/coursesRoutes';
import { formBlueprintRouter } from './Forms_App/routes/formBlueprint';
import { formDataRouter } from './Forms_App/routes/formDataRoute';

// ~ ######################## Setup the wole app 
  const app = express();
  
  // * Global middlewares
    app.use(express.json());                       // & Translator
    app.use(cookieParser());                       // & For Auth
    app.use(xss());                                // & Protects against Cross-Site Scripting (XSS) attacks and prevent injection of malicious scripts.
    const corsOptions = {
      origin: ['http://localhost:3000', 'https://e-commerce-nu-six-55.vercel.app'],
      methods: ['GET', 'POST', 'PUT' , 'PATCH' , 'DELETE'],
      credentials: true,  
    };
    app.use(cors(corsOptions));                    // & allow any frontend req (Not secure I know but it just a project for my portfolio )
    app.use(mongoSanitize());                      // & DB security 
    app.use(express.urlencoded({extended: true})); // & Handel Complex req
    // app.use(morgan('dev'));                     // & API req logs
    app.use(helmet());                             // & security 
  // * Global middlewares
  
  // * Routing middlewares For E-cmmerce App
    app.use("/products", productRouter);
    app.use("/cloudinary_signature", signature);
    app.use("/categories", CategoryRouter);
    app.use("/variants", VariantRouter);
    app.use("/user", userRouter);
    app.use("/auth", authRouter );
    app.use("/orders", OrderRouter);
  // * Routing middlewares For E-cmmerce App 

  // * Routing middlewares For Education-Hub App
    app.use("/courses", coursesRouter);
    app.use("/students", studentsRouter);
    app.use("/teachers", teachersRouter);
  // * Routing middlewares For Education-Hub App
  // * Routing middlewares For Forms App
    app.use("/forms/blueprint", formBlueprintRouter);
    app.use("/forms/data", formDataRouter);
  // * Routing middlewares For Forms App


    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError(`Sorry pro, But We Can't find ${req.originalUrl} on this server`, 404));
    });
// ~ ######################## Setup the wole app 
export default app;
