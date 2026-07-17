import express from "express";
import {
  buildOrganizationList,
  buildOrganizationDetail,
} from "../controllers/organizationController.js";

const router = express.Router();

router.get("/organizations", buildOrganizationList);
router.get("/organization/:id", buildOrganizationDetail);

export default router;