import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Models
import { getAllOrganizations } from "./src/models/organizations.js";
import { getAllProjects } from "./src/models/projects.js";
import { getAllCategories } from "./src/models/categories.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set views folder
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// =======================
// Home
// =======================
app.get("/", (req, res) => {
    res.render("index", {
        title: "Home",
    });
});

// =======================
// Organizations
// =======================
app.get("/organizations", async (req, res) => {
    try {
        const organizations = await getAllOrganizations();

        res.render("organizations", {
            title: "Organizations",
            organizations,
        });

    } catch (error) {
        console.error("Organization Error:", error);
        res.status(500).send("Database Error");
    }
});

// =======================
// Projects
// =======================
app.get("/projects", async (req, res) => {
    try {
        const projects = await getAllProjects();

        res.render("projects", {
            title: "Service Projects",
            projects,
        });

    } catch (error) {
        console.error("Project Error:", error);
        res.status(500).send("Database Error");
    }
});

// =======================
// Categories
// =======================
app.get("/categories", async (req, res) => {
    try {
        const categories = await getAllCategories();

        res.render("categories", {
            title: "Service Project Categories",
            categories,
        });

    } catch (error) {
        console.error("Category Error:", error);
        res.status(500).send("Database Error");
    }
});

// =======================
// 404 Page
// =======================
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

// =======================
// Start Server
// =======================
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});