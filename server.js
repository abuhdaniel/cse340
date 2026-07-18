import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Route Files
import organizationRoutes from "./routes/organizationRoute.js";
import projectRoutes from "./routes/projectRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------------------------------------
// Current Directory
// --------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------------------------------------
// View Engine
// --------------------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --------------------------------------------------
// Middleware
// --------------------------------------------------
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --------------------------------------------------
// Home Route
// --------------------------------------------------
app.get("/", (req, res) => {
  res.render("index", {
    title: "Community Service Directory",
  });
});

// --------------------------------------------------
// Application Routes
// --------------------------------------------------
app.use("/", organizationRoutes);
app.use("/", projectRoutes);
app.use("/", categoryRoutes);

// --------------------------------------------------
// 404 Handler
// --------------------------------------------------
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 - Page Not Found",
  });
});

// --------------------------------------------------
// Global Error Handler
// --------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).render("500", {
    title: "500 - Internal Server Error",
    error: err,
  });
});

// --------------------------------------------------
// Start Server
// --------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});