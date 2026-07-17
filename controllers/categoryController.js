import {
  getAllCategories,
  getCategoryById,
} from "../src/models/categories.js";

import { getProjectsByCategory } from "../src/models/projects.js";

const buildCategoryList = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Service Project Categories",
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500", {
      title: "Server Error",
    });
  }
};

const buildCategoryDetail = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await getCategoryById(id);

    const projects = await getProjectsByCategory(id);

    res.render("category", {
      title: category.name,
      category,
      projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("500", {
      title: "Server Error",
    });
  }
};

export {
  buildCategoryList,
  buildCategoryDetail,
};