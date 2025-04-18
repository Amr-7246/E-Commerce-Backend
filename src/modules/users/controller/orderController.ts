import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "@src/modules/products/controller/factoryController";
import { Order } from "../models/Order";


export const createOrder = createEntitiy(Order);

export const getOrder = getEntitiy(Order);

export const getAllOrders = getAllEntitiy(Order);

export const updateOrder = updateEntitiy(Order);

export const deleteOrder = deleteEntitiy(Order);
