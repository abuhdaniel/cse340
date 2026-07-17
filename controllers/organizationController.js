import { getAllOrganizations, getOrganizationById } from "../src/models/organizations.js";
import { getAllProjects } from "../src/models/projects.js";

const buildOrganizationList = async (req, res) => {
  try {
    const organizations = await getAllOrganizations();

    res.render("organizations", {
      title: "Organizations",
      organizations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500", {
      title: "Server Error",
    });
  }
};

const buildOrganizationDetail = async (req, res) => {
  try {
    const id = req.params.id;

    const organization = await getOrganizationById(id);
    const projects = await getAllProjects();

    const organizationProjects = projects.filter(
      (project) => project.organization_id == id
    );

    res.render("organization", {
      title: organization.name,
      organization,
      projects: organizationProjects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500", {
      title: "Server Error",
    });
  }
};

export {
  buildOrganizationList,
  buildOrganizationDetail,
};