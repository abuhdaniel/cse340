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
import { requireRole } from "../utilities/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/organizations", buildOrganizationList);
router.get("/organization/:id", buildOrganizationDetail);

// ========================================
// Create Organization (Admin Only)
// ========================================
router.get(
  "/new-organization",
  requireRole("admin"),
  buildNewOrganization
);

router.post(
  "/new-organization",
  requireRole("admin"),
  organizationRules(),
  addOrganization
);

// ========================================
// Edit Organization (Admin Only)
// ========================================
router.get(
  "/edit-organization/:id",
  requireRole("admin"),
  buildEditOrganization
);

router.post(
  "/edit-organization/:id",
  requireRole("admin"),
  organizationRules(),
  editOrganization
);

export default router;