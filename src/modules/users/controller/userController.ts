import { Request, Response, NextFunction } from "express";
import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "../../products/controller/factoryController";
import mongoose from "mongoose";
import { User } from "../models/userModel";
import { catchError } from "../../../utils/catchError";

export const getAllUsers = getAllEntitiy(User);
export const getUser = getEntitiy(User);
export const createUser = createEntitiy(User);
export const updateUser = updateEntitiy(User);
export const deleteUser = deleteEntitiy(User);

// ~ Handel user cart (addToCart) 
  export const addToCart = catchError(async (req: Request | any, res: Response, next: NextFunction) => {
    const user = req.user;
    const { productId, newCount } = req.body;
    console.log(user, productId);

    const cartItem = user.cart.find((p: any) => p?.productId?.toString() === productId);

    if (cartItem) {
      user.cart = user.cart.map((c: any) => (c.productId.toString() === productId ? { ...c, quantity: newCount } : c));
    } else {
      user.cart.push({ productId: new mongoose.Types.ObjectId(productId), quantity: 1 });
    }

    await user.save();

    res.status(200).json({ data: { user: user }, status: "success", message: "Product added to cart" });
  });
// ~ Handel user cart (addToCart) 
// ~ Handel user cart (removeFromCart) 
  //@ts-ignore
  export const removeFromCart = catchError(async (req: Request | any, res: Response) => {
    const user = req.user;
    const { productId, newCount } = req.body;

    const cartItem = user.cart.find((c: any) => c.productId.toString() === productId);

    if (!cartItem) {
      return res.status(404).json({ status: "error", message: "Product not found in cart" });
    }

    if (cartItem.quantity > 1) {
      user.cart = user.cart.map((c: any) =>
        c.productId.toString() === productId ? { productId: c.productId, quantity: newCount } : c
      );
    } else {
      user.cart = user.cart.filter((c: any) => c.productId.toString() !== productId);
    }

    await user.save();

    res.status(200).json({ data: { user }, status: "success", message: "Product removed from cart" });
  });
// ~ Handel user cart (removeFromCart) 
