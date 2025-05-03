import express from "express";
import {
  getAllCategory,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categoryController";
const router = express.Router();

router.route("/").get(getAllCategory).post(createCategory);
router.route("/:id").get(getCategory).patch(updateCategory).delete(deleteCategory);

export const CategoryRouter = router;
