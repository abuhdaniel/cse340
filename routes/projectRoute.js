import express from "express";

const router = express.Router();

import {
  buildProjectList,
  buildProjectDetail,
  buildNewProject,
  addProject,
  buildEditProject,
  editProject,
  buildAssignCategories,
  assignCategories,
} from "../controllers/projectController.js";

import { projectRules } from "../utilities/project-validation.js";
import { requireRole } from "../utilities/authMiddleware.js";

/*
 * Project List (Public)
 */
router.get("/projects", buildProjectList);

/*
 * Individual Project (Public)
 */
router.get("/project/:id", buildProjectDetail);

/*
 * Create Project (Admin Only)
 */
router.get(
  "/new-project",
  requireRole("admin"),
  buildNewProject
);

router.post(
  "/new-project",
  requireRole("admin"),
  projectRules(),
  addProject
);

/*
 * Edit Project (Admin Only)
 */
router.get(
  "/edit-project/:id",
  requireRole("admin"),
  buildEditProject
);

router.post(
  "/edit-project/:id",
  requireRole("admin"),
  projectRules(),
  editProject
);

/*
 * Assign Categories (Admin Only)
 */
router.get(
  "/assign-categories/:id",
  requireRole("admin"),
  buildAssignCategories
);

router.post(
  "/assign-categories/:id",
  requireRole("admin"),
  assignCategories
);

/*
 * Test Route
 */
router.get("/test-project", (req, res) => {
  res.send("Project Route Working");
});

export default router;