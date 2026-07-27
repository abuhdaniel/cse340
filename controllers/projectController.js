import { validationResult } from "express-validator";

import {
  getAllProjects,
  getProjectById,
  getCategoriesByProject,
  createProject,
  updateProject,
  getProjectCategories,
  updateProjectCategories,
} from "../src/models/projects.js";

import { getAllOrganizations } from "../src/models/organizations.js";
import { getAllCategories } from "../src/models/categories.js";

/**
 * Build Projects List
 */
const buildProjectList = async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.render("projects", {
      title: "Service Projects",
      projects,
    });
  } catch (error) {
    console.error("PROJECT LIST ERROR:");
    console.error(error);

    res.status(500).send(`
      <h1>PROJECT LIST ERROR</h1>
      <pre>${error.stack}</pre>
    `);
  }
};

/**
 * Build Project Detail
 */
const buildProjectDetail = async (req, res) => {
  try {
    const id = req.params.id;

    const project = await getProjectById(id);

    if (!project) {
      return res.status(404).render("404", {
        title: "Project Not Found",
      });
    }

    const categories = await getCategoriesByProject(id);

    res.render("project", {
      title: project.name,
      project,
      categories,
    });
  } catch (error) {
    console.error("PROJECT DETAIL ERROR:");
    console.error(error);

    res.status(500).send(`
      <h1>PROJECT DETAIL ERROR</h1>
      <pre>${error.stack}</pre>
    `);
  }
};

/**
 * Build New Project Form
 */
const buildNewProject = async (req, res) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("new-project", {
      title: "Create New Project",
      organizations,
      errors: [],
      organization_id: "",
      name: "",
      description: "",
      location: "",
      project_date: "",
    });
  } catch (error) {
    console.error("NEW PROJECT ERROR:");
    console.error(error);

    res.status(500).send(`
      <h1>NEW PROJECT ERROR</h1>
      <pre>${error.stack}</pre>
    `);
  }
};

/**
 * Create Project
 */
const addProject = async (req, res) => {
  const errors = validationResult(req);

  const {
    organization_id,
    name,
    description,
    location,
    project_date,
  } = req.body;

  const organizations = await getAllOrganizations();

  if (!errors.isEmpty()) {
    return res.render("new-project", {
      title: "Create New Project",
      organizations,
      errors: errors.array(),
      organization_id,
      name,
      description,
      location,
      project_date,
    });
  }

  try {
    await createProject({
      organization_id,
      name,
      description,
      location,
      project_date,
    });

    req.flash("success", "Project created successfully.");

    res.redirect("/projects");
  } catch (error) {
    console.error("CREATE PROJECT ERROR:");
    console.error(error);

    res.status(500).send(`
      <h1>CREATE PROJECT ERROR</h1>
      <pre>${error.stack}</pre>
    `);
  }
};

/**
 * Build Edit Project Form
 */
const buildEditProject = async (req, res) => {
  try {
    const id = req.params.id;

    const project = await getProjectById(id);

    if (!project) {
      return res.status(404).render("404", {
        title: "Project Not Found",
      });
    }

    const organizations = await getAllOrganizations();

    res.render("edit-project", {
      title: "Edit Project",
      project,
      organizations,
      errors: [],
    });
  } catch (error) {
    console.error("EDIT PROJECT PAGE ERROR:");
    console.error(error);

    res.status(500).send(`
      <h1>EDIT PROJECT PAGE ERROR</h1>
      <pre>${error.stack}</pre>
    `);
  }
};

/**
 * Update Project
 */
const editProject = async (req, res) => {
  const errors = validationResult(req);

  const id = req.params.id;

  const {
    organization_id,
    name,
    description,
    location,
    project_date,
  } = req.body;

  const organizations = await getAllOrganizations();

  if (!errors.isEmpty()) {
    return res.render("edit-project", {
      title: "Edit Project",
      project: {
        project_id: id,
        organization_id,
        name,
        description,
        location,
        project_date,
      },
      organizations,
      errors: errors.array(),
    });
  }

  try {
    await updateProject(id, {
      organization_id,
      name,
      description,
      location,
      project_date,
    });

    req.flash("success", "Project updated successfully.");

    res.redirect(`/project/${id}`);
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:");
    console.error(error);

    res.status(500).send(`
      <h1>UPDATE PROJECT ERROR</h1>
      <pre>${error.stack}</pre>
    `);
  }
};

/**
 * Build Assign Categories Page
 */
const buildAssignCategories = async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await getProjectById(projectId);

    if (!project) {
      return res.status(404).render("404", {
        title: "Project Not Found",
      });
    }

    const categories = await getAllCategories();

    const assignedCategories = await getProjectCategories(projectId);

    res.render("assign-categories", {
      title: `Assign Categories - ${project.name}`,
      project,
      categories,
      assignedCategories,
    });
  } catch (error) {
    console.error("ASSIGN CATEGORY PAGE ERROR:");
    console.error(error);

    res.status(500).send(`
      <h1>ASSIGN CATEGORY PAGE ERROR</h1>
      <pre>${error.stack}</pre>
    `);
  }
};

/**
 * Save Assigned Categories
 */
const assignCategories = async (req, res) => {
  try {
    const projectId = req.params.id;

    let { categoryIds } = req.body;

    if (!categoryIds) {
      categoryIds = [];
    }

    if (!Array.isArray(categoryIds)) {
      categoryIds = [categoryIds];
    }

    await updateProjectCategories(projectId, categoryIds);

    req.flash("success", "Project categories updated successfully.");

    res.redirect(`/project/${projectId}`);
  } catch (error) {
    console.error("SAVE CATEGORY ERROR:");
    console.error(error);

    res.status(500).send(`
      <h1>SAVE CATEGORY ERROR</h1>
      <pre>${error.stack}</pre>
    `);
  }
};

export {
  buildProjectList,
  buildProjectDetail,
  buildNewProject,
  addProject,
  buildEditProject,
  editProject,
  buildAssignCategories,
  assignCategories,
};