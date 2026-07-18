import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategory,
} from "../src/models/categories.js";

/**
 * Build Categories List Page
 */
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
      error,
    });
  }
};

/**
 * Build Individual Category Page
 */
const buildCategoryDetail = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await getCategoryById(id);

    if (!category) {
      return res.status(404).render("404", {
        title: "Category Not Found",
      });
    }

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
      error,
    });
  }
};

export {
  buildCategoryList,
  buildCategoryDetail,
};