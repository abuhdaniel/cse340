import {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganization,
} from "../src/models/organizations.js";

/**
 * Build Organizations List Page
 */
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
      error,
    });
  }
};

/**
 * Build Individual Organization Page
 */
const buildOrganizationDetail = async (req, res) => {
  try {
    const id = req.params.id;

    const organization = await getOrganizationById(id);

    if (!organization) {
      return res.status(404).render("404", {
        title: "Organization Not Found",
      });
    }

    const projects = await getProjectsByOrganization(id);

    res.render("organization", {
      title: organization.name,
      organization,
      projects,
    });
  } catch (error) {
    console.error(error);

    res.status(500).render("500", {
      title: "Server Error",
      error,
    });
  }
};

export {
  buildOrganizationList,
  buildOrganizationDetail,
};