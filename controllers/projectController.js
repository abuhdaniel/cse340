import {
  getAllProjects,
  getProjectById,
  getCategoriesByProject,
} from "../src/models/projects.js";

/**
 * Build the Projects List page
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
      <h1>Project List Error</h1>
      <pre>${error.stack}</pre>
    `);
  }
};

/**
 * Build Individual Project page
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
      <h1>Project Detail Error</h1>
      <pre>${error.stack}</pre>
    `);
  }
};

export {
  buildProjectList,
  buildProjectDetail,
};