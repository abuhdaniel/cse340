import express from "express";

import {
  buildOrganizationList,
  buildOrganizationDetail,
  buildNewOrganization,
  addOrganization,
  buildEditOrganization,
  editOrganization,
} from "../controllers/organizationController.js";

import { organizationRules } from "../utilities/organization-validation.js";

const router = express.Router();

router.get("/organizations", buildOrganizationList);
router.get("/organization/:id", buildOrganizationDetail);

// Create Organization
router.get("/new-organization", buildNewOrganization);
router.post(
  "/new-organization",
  organizationRules(),
  addOrganization
);

// Edit Organization
router.get("/edit-organization/:id", buildEditOrganization);
router.post(
  "/edit-organization/:id",
  organizationRules(),
  editOrganization
);

export default router;