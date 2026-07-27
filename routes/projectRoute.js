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

/*
 * Project List
 */
router.get("/projects", buildProjectList);

/*
 * Individual Project
 */
router.get("/project/:id", buildProjectDetail);

/*
 * Create Project
 */
router.get("/new-project", buildNewProject);

router.post(
  "/new-project",
  projectRules(),
  addProject
);

/*
 * Edit Project
 */
router.get(
  "/edit-project/:id",
  buildEditProject
);

router.post(
  "/edit-project/:id",
  projectRules(),
  editProject
);

/*
 * Assign Categories
 */
router.get(
  "/assign-categories/:id",
  buildAssignCategories
);

router.post(
  "/assign-categories/:id",
  assignCategories
);

export default router;
router.get("/test-project", (req, res) => {
  res.send("Project Route Working");
});