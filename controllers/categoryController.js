import { validationResult } from "express-validator";

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  getProjectsByCategory,
} from "../src/models/categories.js";

/**
 * Build Categories List
 */
const buildCategoryList = async (req, res) => {
  try {
    const categories = await getAllCategories();

    res.render("categories", {
      title: "Service Categories",
      categories,
    });
  } catch (error) {
    console.error("CATEGORY LIST ERROR:");
    console.error(error);

    res.status(500).send("Server Error");
  }
};

/**
 * Build Individual Category
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
    console.error("CATEGORY DETAIL ERROR:");
    console.error(error);

    res.status(500).send("Server Error");
  }
};

/**
 * Build New Category Form
 */
const buildNewCategory = async (req, res) => {
  res.render("new-category", {
    title: "Create New Category",
    errors: [],
    name: "",
  });
};

/**
 * Add New Category
 */
const addCategory = async (req, res) => {
  const errors = validationResult(req);

  const { name } = req.body;

  if (!errors.isEmpty()) {
    return res.render("new-category", {
      title: "Create New Category",
      errors: errors.array(),
      name,
    });
  }

  try {
    await createCategory(name);

    req.flash(
      "success",
      "Category created successfully."
    );

    res.redirect("/categories");
  } catch (error) {
    console.error(error);

    req.flash(
      "error",
      "Unable to create category."
    );

    res.redirect("/new-category");
  }
};

/**
 * Build Edit Category Form
 */
const buildEditCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await getCategoryById(id);

    if (!category) {
      return res.status(404).render("404", {
        title: "Category Not Found",
      });
    }

    res.render("edit-category", {
      title: "Edit Category",
      category,
      errors: [],
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Server Error");
  }
};

/**
 * Update Category
 */
const editCategory = async (req, res) => {
  const errors = validationResult(req);

  const id = req.params.id;

  const { name } = req.body;

  if (!errors.isEmpty()) {
    return res.render("edit-category", {
      title: "Edit Category",
      category: {
        category_id: id,
        name,
      },
      errors: errors.array(),
    });
  }

  try {
    await updateCategory(id, name);

    req.flash(
      "success",
      "Category updated successfully."
    );

    res.redirect(`/category/${id}`);
  } catch (error) {
    console.error(error);

    req.flash(
      "error",
      "Unable to update category."
    );

    res.redirect(`/edit-category/${id}`);
  }
};

export {
  buildCategoryList,
  buildCategoryDetail,
  buildNewCategory,
  addCategory,
  buildEditCategory,
  editCategory,
};