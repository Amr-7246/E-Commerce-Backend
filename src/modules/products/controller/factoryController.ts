import { Model, Document } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { catchError } from "../../../utils/catchError";
import APIFeatures from "../../../utils/APIFeatures";
import AppError from "../../../utils/AppError";

// ~ ############### CreateEntitiy
  export const createEntitiy = <T extends Document>(Model: Model<T>, ModelName?: string) =>
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const doc = await Model.create(req.body);
      res.status(200).json({ data: { doc } , message: ` You Have created ${ModelName} successfully Now ` });
    });
// ~ ############### CreateEntitiy
// ~ ############### GetEntitiy
  export const getEntitiy = <T extends Document>(Model: Model<T>) =>
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const doc = await Model.findById(id);
      res.status(200).json({ data: { doc } });
    });
// ~ ############### GetEntitiy
// ~ ############### GetAllEntitiy
  export const getAllEntitiy = <T extends Document>(Model: Model<T>) =>
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      console.log(req);
      const docs = await new APIFeatures(Model.find(), req.query).paginate().filter().sort().limitFields().query;
      const totalCount = await Model.countDocuments();
      const totalPages = Math.floor(totalCount / (req.query.limit ? +req.query.limit : 10));
      res.status(200).json({ data: { docs }, totalPages });
    });
// ~ ############### GetAllEntitiy
// ~ ############### UpdateEntitiy
  export const updateEntitiy = <T extends Document>(Model: Model<T>) =>
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const doc = await Model.findByIdAndUpdate(id, req.body, { new: true });
      if (!doc) return next(new AppError("No document found with this id", 404));
      res.status(200).json({ data: { doc } });
    });
// ~ ############### UpdateEntitiy
// ~ ############### DeleteEntitiy
  export const deleteEntitiy = <T extends Document>(Model: Model<T>) =>
    catchError(async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const doc = await Model.findByIdAndDelete(id);
      if (!doc) return next(new AppError("No document found with this id", 404));

      res.status(200).json({ message: "succsessfully deleted" });
    });
// ~ ############### DeleteEntitiy