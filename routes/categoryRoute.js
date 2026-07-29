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
import { requireRole } from "../utilities/authMiddleware.js";

/*
 * Category List (Public)
 */
router.get("/categories", buildCategoryList);

/*
 * Individual Category (Public)
 */
router.get("/category/:id", buildCategoryDetail);

/*
 * Create Category (Admin Only)
 */
router.get(
  "/new-category",
  requireRole("admin"),
  buildNewCategory
);

router.post(
  "/new-category",
  requireRole("admin"),
  categoryRules(),
  addCategory
);

/*
 * Edit Category (Admin Only)
 */
router.get(
  "/edit-category/:id",
  requireRole("admin"),
  buildEditCategory
);

router.post(
  "/edit-category/:id",
  requireRole("admin"),
  categoryRules(),
  editCategory
);

export default router;