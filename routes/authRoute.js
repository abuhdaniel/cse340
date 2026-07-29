import express from "express";
import {
  buildRegister,
  buildLogin,
  processRegister,
  processLogin,
  buildDashboard,
  logout,
} from "../controllers/authController.js";

import {
  requireLogin,
} from "../utilities/authMiddleware.js";

const router = express.Router();

/* ===========================================
   Registration Routes
=========================================== */
router.get("/register", buildRegister);
router.post("/register", processRegister);

/* ===========================================
   Login Routes
=========================================== */
router.get("/login", buildLogin);
router.post("/login", processLogin);

/* ===========================================
   Dashboard
=========================================== */
router.get("/dashboard", requireLogin, buildDashboard);

/* ===========================================
   Logout
=========================================== */
router.get("/logout", logout);

export default router;