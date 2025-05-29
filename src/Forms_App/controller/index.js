"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFormData = exports.deleteFormData = exports.getAllFormData = exports.getFormData = exports.pushFormData = exports.updateFormBluprint = exports.deleteFormBluprint = exports.getAllFormBluprints = exports.getFormBluprint = exports.createFormBluprint = void 0;
const factory_1 = require("../utils/factory");
const formBlueprint_1 = require("../models/formBlueprint");
// ~ Basic Forms Operations
exports.createFormBluprint = (0, factory_1.createEntitiy)(formBlueprint_1.FormBlueprintModel, "FormBlueprintModel");
exports.getFormBluprint = (0, factory_1.getEntitiy)(formBlueprint_1.FormBlueprintModel);
exports.getAllFormBluprints = (0, factory_1.getAllEntitiy)(formBlueprint_1.FormBlueprintModel);
exports.deleteFormBluprint = (0, factory_1.deleteEntitiy)(formBlueprint_1.FormBlueprintModel);
exports.updateFormBluprint = (0, factory_1.updateEntitiy)(formBlueprint_1.FormBlueprintModel);
// ~ Basic Forms Operations
exports.pushFormData = (0, factory_1.createEntitiy)(FormData, "FormData");
exports.getFormData = (0, factory_1.getEntitiy)(FormData);
exports.getAllFormData = (0, factory_1.getAllEntitiy)(FormData);
exports.deleteFormData = (0, factory_1.deleteEntitiy)(FormData);
exports.updateFormData = (0, factory_1.updateEntitiy)(FormData);
