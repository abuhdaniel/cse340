import db from "./db.js";

/**
 * Get all categories
 */
const getAllCategories = async () => {
  const sql = `
    SELECT
      category_id,
      name
    FROM category
    ORDER BY name;
  `;

  const result = await db.query(sql);
  return result.rows;
};

/**
 * Get one category by ID
 */
const getCategoryById = async (id) => {
  const sql = `
    SELECT
      category_id,
      name
    FROM category
    WHERE category_id = $1;
  `;

  const result = await db.query(sql, [id]);
  return result.rows[0];
};

/**
 * Create a new category
 */
const createCategory = async (name) => {
  const sql = `
    INSERT INTO category (name)
    VALUES ($1)
    RETURNING *;
  `;

  const result = await db.query(sql, [name]);
  return result.rows[0];
};

/**
 * Update a category
 */
const updateCategory = async (id, name) => {
  const sql = `
    UPDATE category
    SET name = $1
    WHERE category_id = $2
    RETURNING *;
  `;

  const result = await db.query(sql, [name, id]);
  return result.rows[0];
};

/**
 * Get all projects in a category
 */
const getProjectsByCategory = async (categoryId) => {
  const sql = `
    SELECT
      p.project_id,
      p.name,
      p.description,
      p.location,
      p.project_date
    FROM project p
    JOIN project_category pc
      ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date;
  `;

  const result = await db.query(sql, [categoryId]);
  return result.rows;
};

/**
 * Get category IDs assigned to a project
 */
const getProjectCategories = async (projectId) => {
  const sql = `
    SELECT category_id
    FROM project_category
    WHERE project_id = $1;
  `;

  const result = await db.query(sql, [projectId]);

  return result.rows.map(row => row.category_id);
};

/**
 * Update category assignments for a project
 */
const updateProjectCategories = async (projectId, categoryIds) => {

  await db.query(
    `DELETE FROM project_category WHERE project_id = $1`,
    [projectId]
  );

  if (!categoryIds || categoryIds.length === 0) {
    return;
  }

  for (const categoryId of categoryIds) {

    await db.query(
      `
      INSERT INTO project_category (
        project_id,
        category_id
      )
      VALUES ($1, $2)
      `,
      [projectId, categoryId]
    );

  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  getProjectsByCategory,
  getProjectCategories,
  updateProjectCategories,
};