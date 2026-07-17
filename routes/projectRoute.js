import express from "express";
import {
  buildProjectList,
  buildProjectDetail,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/projects", buildProjectList);
router.get("/project/:id", buildProjectDetail);

export default router;