"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntitiy = exports.updateEntitiy = exports.getAllEntitiy = exports.getEntitiy = exports.createEntitiy = void 0;
const catchError_1 = require("../../../utils/catchError");
const APIFeatures_1 = __importDefault(require("../../../utils/APIFeatures"));
const AppError_1 = __importDefault(require("../../../utils/AppError"));
// ~ ############### CreateEntitiy
const createEntitiy = (Model, ModelName) => (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield Model.create(req.body);
    res.status(200).json({ data: { doc }, message: ` You Have created ${ModelName} successfully Now ` });
}));
exports.createEntitiy = createEntitiy;
// ~ ############### CreateEntitiy
// ~ ############### GetEntitiy
const getEntitiy = (Model) => (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const doc = yield Model.findById(id);
    res.status(200).json({ data: { doc } });
}));
exports.getEntitiy = getEntitiy;
// ~ ############### GetEntitiy
// ~ ############### GetAllEntitiy
const getAllEntitiy = (Model) => (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const docs = yield new APIFeatures_1.default(Model.find(), req.query).paginate().filter().sort().limitFields().query;
    const totalCount = yield Model.countDocuments();
    const totalPages = Math.floor(totalCount / (req.query.limit ? +req.query.limit : 10));
    res.status(200).json({ data: { docs }, totalPages });
}));
exports.getAllEntitiy = getAllEntitiy;
// ~ ############### GetAllEntitiy
// ~ ############### UpdateEntitiy
const updateEntitiy = (Model) => (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const doc = yield Model.findByIdAndUpdate(id, req.body, { new: true });
    if (!doc)
        return next(new AppError_1.default("No document found with this id", 404));
    res.status(200).json({ data: { doc } });
}));
exports.updateEntitiy = updateEntitiy;
// ~ ############### UpdateEntitiy
// ~ ############### DeleteEntitiy
const deleteEntitiy = (Model) => (0, catchError_1.catchError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const doc = yield Model.findByIdAndDelete(id);
    if (!doc)
        return next(new AppError_1.default("No document found with this id", 404));
    res.status(200).json({ message: "succsessfully deleted" });
}));
exports.deleteEntitiy = deleteEntitiy;
// ~ ############### DeleteEntitiy
