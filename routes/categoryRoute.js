import express from "express";

const router = express.Router();

import {
  buildCategoryList,
  buildCategoryDetail,
  buildNewCategory,
  addCategory,
  buildEditCategory,
  editCategory,
} from "../controllers/categoryController.js";

import { categoryRules } from "../utilities/category-validation.js";

/*
 * Category List
 */
router.get("/categories", buildCategoryList);

/*
 * Individual Category
 */
router.get("/category/:id", buildCategoryDetail);

/*
 * Create Category
 */
router.get("/new-category", buildNewCategory);

router.post(
  "/new-category",
  categoryRules(),
  addCategory
);

/*
 * Edit Category
 */
router.get(
  "/edit-category/:id",
  buildEditCategory
);

router.post(
  "/edit-category/:id",
  categoryRules(),
  editCategory
);

export default router;