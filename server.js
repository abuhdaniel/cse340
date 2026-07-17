import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import Route Files
import organizationRoutes from "./routes/organizationRoute.js";
import projectRoutes from "./routes/projectRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// View Engine
app.set("view engine", "ejs");

// Views Folder
app.set("views", path.join(__dirname, "views"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Parse Form Data
app.use(express.urlencoded({ extended: true }));

// Parse JSON
app.use(express.json());

// =====================
// Home Page
// =====================
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

// =====================
// Routes
// =====================
app.use("/", organizationRoutes);
app.use("/", projectRoutes);
app.use("/", categoryRoutes);

// =====================
// 404 Error
// =====================
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
  });
});

// =====================
// 500 Error
// =====================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).render("500", {
    title: "500 - Internal Server Error",
  });
});

// =====================
// Start Server
// =====================
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});