import db from "./db.js";

/**
 * Get all projects
 */
const getAllProjects = async () => {
  const query = `
    SELECT
      project_id,
      organization_id,
      name,
      description
    FROM project
    ORDER BY project_id;
  `;

  const result = await db.query(query);

  return result.rows;
};

/**
 * Get one project by ID
 */
const getProjectById = async (id) => {
  const query = `
    SELECT
      p.project_id,
      p.organization_id,
      p.name,
      p.description,
      o.name AS organization_name
    FROM project p
    JOIN organization o
      ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

/**
 * Get all projects in a category
 */
const getProjectsByCategory = async (categoryId) => {
  const query = `
    SELECT
      p.project_id,
      p.name,
      p.description
    FROM project p
    JOIN project_category pc
      ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.name;
  `;

  const result = await db.query(query, [categoryId]);

  return result.rows;
};

/**
 * Get all categories for a project
 */
const getCategoriesByProject = async (projectId) => {
  const query = `
    SELECT
      c.category_id,
      c.name
    FROM category c
    JOIN project_category pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;
  `;

  const result = await db.query(query, [projectId]);

  return result.rows;
};

export {
  getAllProjects,
  getProjectById,
  getProjectsByCategory,
  getCategoriesByProject
};