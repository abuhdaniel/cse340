import {
  getAllOrganizations,
  getOrganizationById,
  getProjectsByOrganization,
  createOrganization,
  updateOrganization,
} from "../src/models/organizations.js";

import { validationResult } from "express-validator";

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
 * Build Organization Detail Page
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

/**
 * Display New Organization Form
 */
const buildNewOrganization = (req, res) => {
  res.render("new-organization", {
    title: "Create Organization",
    organization: {},
    errors: [],
  });
};

/**
 * Create Organization
 */
const addOrganization = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("new-organization", {
      title: "Create Organization",
      organization: req.body,
      errors: errors.array(),
    });
  }

  try {

    const {
      name,
      description,
      contact_email,
      logo_filename,
    } = req.body;

    await createOrganization(
      name,
      description,
      contact_email,
      logo_filename
    );

    req.flash("success", "Organization created successfully.");

    res.redirect("/organizations");

  } catch (error) {

    console.error(error);

    res.render("new-organization", {
      title: "Create Organization",
      organization: req.body,
      errors: [{ msg: "Unable to create organization." }],
    });

  }
};

/**
 * Display Edit Organization Form
 */
const buildEditOrganization = async (req, res) => {

  try {

    const organization = await getOrganizationById(req.params.id);

    if (!organization) {
      return res.status(404).render("404", {
        title: "Organization Not Found",
      });
    }

    res.render("edit-organization", {
      title: "Edit Organization",
      organization,
      errors: [],
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
 * Update Organization
 */
const editOrganization = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.render("edit-organization", {
      title: "Edit Organization",
      organization: {
        organization_id: req.params.id,
        ...req.body,
      },
      errors: errors.array(),
    });

  }

  try {

    const {
      name,
      description,
      contact_email,
      logo_filename,
    } = req.body;

    await updateOrganization(
      req.params.id,
      name,
      description,
      contact_email,
      logo_filename
    );

    req.flash("success", "Organization updated successfully.");

    res.redirect(`/organization/${req.params.id}`);

  } catch (error) {

    console.error(error);

    res.render("edit-organization", {
      title: "Edit Organization",
      organization: {
        organization_id: req.params.id,
        ...req.body,
      },
      errors: [{ msg: "Unable to update organization." }],
    });

  }
};

export {
  buildOrganizationList,
  buildOrganizationDetail,
  buildNewOrganization,
  addOrganization,
  buildEditOrganization,
  editOrganization,
};