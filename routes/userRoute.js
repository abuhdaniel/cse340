import express from "express";
import { buildUsersPage } from "../controllers/userController.js";
import { requireRole } from "../utilities/authMiddleware.js";

const router = express.Router();

/* ===========================================
   Registered Users (Admin Only)
=========================================== */
router.get(
  "/users",
  requireRole("admin"),
  buildUsersPage
);

export default router;