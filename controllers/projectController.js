import {
  getAllProjects,
  getProjectById,
  getCategoriesByProject,
} from "../src/models/projects.js";

const buildProjectList = async (req, res) => {
  try {
    const projects = await getAllProjects();

    res.render("projects", {
      title: "Service Projects",
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500", {
      title: "Server Error",
    });
  }
};

const buildProjectDetail = async (req, res) => {
  try {
    const id = req.params.id;

    const project = await getProjectById(id);

    const categories = await getCategoriesByProject(id);

    res.render("project", {
      title: project.name,
      project,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500", {
      title: "Server Error",
    });
  }
};

export {
  buildProjectList,
  buildProjectDetail,
};