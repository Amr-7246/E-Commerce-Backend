import { Request, Response, NextFunction } from "express";
import { catchError } from "@src/util/catchError";
import { getAllEntitiy, getEntitiy, createEntitiy, updateEntitiy, deleteEntitiy } from "./factoryController";
import AppError from "@src/util/AppError";
import { Product } from "../models";

export const createProduct = createEntitiy(Product);
export const getProduct = getEntitiy(Product);
export const getAllProducts = getAllEntitiy(Product);
export const updateProduct = updateEntitiy(Product);
export const deleteProduct = deleteEntitiy(Product);

// & ################# addNewVariant
  export const addNewVariant = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(
      id,
      { $push: { variants: req.body } },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!product) return next(new AppError("No product found with this id", 404));
    res.status(200).json({ data: { product }, message: "variant added successfully to the product  !" });
  });
// & ################# addNewVariant
// & ################# updateVariant
  export const updateVariant = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const { id, variantId } = req.params;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, "variants._id": variantId },
      { $set: { "variants.$": req.body } },
      { runValidators: true, new: true }
    );

    if (!updatedProduct) return next(new AppError("No product or variant found with this ID", 404));

    res.status(200).json({
      data: { product: updatedProduct },
      message: "Variant updated successfully!",
    });
  });
// & ################# updateVariant
// & ################# deleteVariant
  export const deleteVariant = catchError(async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $pull: { variants: { _id: req.params.variantId } } },
      { new: true }
    );
    if (!product) return next(new AppError("No product found with this id", 404));
    res.status(204).json({ message: "succsessfully deleted", data: { product } });
  });
// & ################# deleteVariant