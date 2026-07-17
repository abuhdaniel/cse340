import express from "express";
import {
  buildCategoryList,
  buildCategoryDetail,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/categories", buildCategoryList);
router.get("/category/:id", buildCategoryDetail);

export default router;