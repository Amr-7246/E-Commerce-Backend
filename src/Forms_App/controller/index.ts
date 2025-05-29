import { createEntitiy, deleteEntitiy, getAllEntitiy, getEntitiy, updateEntitiy } from "../utils/factory";
import { FormBlueprintModel } from "../models/formBlueprint";

// ~ Basic Forms Operations
export const createFormBluprint = createEntitiy(FormBlueprintModel as any, "FormBlueprintModel");
export const getFormBluprint = getEntitiy(FormBlueprintModel as any);
export const getAllFormBluprints = getAllEntitiy(FormBlueprintModel as any);
export const deleteFormBluprint = deleteEntitiy(FormBlueprintModel as any);
export const updateFormBluprint: ReturnType<typeof updateEntitiy> = updateEntitiy(FormBlueprintModel as any);
// ~ Basic Forms Operations
export const pushFormData = createEntitiy(FormData as any, "FormData");
export const getFormData = getEntitiy(FormData as any);
export const getAllFormData = getAllEntitiy(FormData as any);
export const deleteFormData = deleteEntitiy(FormData as any);
export const updateFormData: ReturnType<typeof updateEntitiy> = updateEntitiy(FormData as any);



