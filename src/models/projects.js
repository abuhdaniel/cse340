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
      description,
      location,
      project_date
    FROM project
    ORDER BY project_date;
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
      p.location,
      p.project_date,
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
 * Create a new project
 */
const createProject = async ({
  organization_id,
  name,
  description,
  location,
  project_date,
}) => {
  const query = `
    INSERT INTO project (
      organization_id,
      name,
      description,
      location,
      project_date
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    organization_id,
    name,
    description,
    location,
    project_date,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
};

/**
 * Update a project
 */
const updateProject = async (
  id,
  {
    organization_id,
    name,
    description,
    location,
    project_date,
  }
) => {
  const query = `
    UPDATE project
    SET
      organization_id = $1,
      name = $2,
      description = $3,
      location = $4,
      project_date = $5
    WHERE project_id = $6
    RETURNING *;
  `;

  const values = [
    organization_id,
    name,
    description,
    location,
    project_date,
    id,
  ];

  const result = await db.query(query, values);
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
      p.description,
      p.location,
      p.project_date
    FROM project p
    JOIN project_category pc
      ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.project_date;
  `;

  const result = await db.query(query, [categoryId]);
  return result.rows;
};

/**
 * Get categories assigned to a project
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

/**
 * Get category IDs assigned to a project
 */
const getProjectCategories = async (projectId) => {
  const query = `
    SELECT category_id
    FROM project_category
    WHERE project_id = $1;
  `;

  const result = await db.query(query, [projectId]);

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
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  getProjectsByCategory,
  getCategoriesByProject,
  getProjectCategories,
  updateProjectCategories,
};