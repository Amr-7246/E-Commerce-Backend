import { Variant } from "../models";
import { createEntitiy , getEntitiy , getAllEntitiy , updateEntitiy, deleteEntitiy } from "./factoryController";

export const createVariant = createEntitiy(Variant);
export const getVariant = getEntitiy(Variant);
export const getAllVariants = getAllEntitiy(Variant);
export const updateVariant = updateEntitiy(Variant);
export const deleteVariant = deleteEntitiy(Variant);
