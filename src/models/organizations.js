import db from "./db.js";

/**
 * Get all organizations
 */
const getAllOrganizations = async () => {
  const query = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM organization
    ORDER BY name;
  `;

  const result = await db.query(query);
  return result.rows;
};

/**
 * Get one organization
 */
const getOrganizationById = async (id) => {
  const query = `
    SELECT
      organization_id,
      name,
      description,
      contact_email,
      logo_filename
    FROM organization
    WHERE organization_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

/**
 * Create organization
 */
const createOrganization = async (
  name,
  description,
  contact_email,
  logo_filename
) => {
  const query = `
    INSERT INTO organization
    (name, description, contact_email, logo_filename)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
  `;

  const result = await db.query(query, [
    name,
    description,
    contact_email,
    logo_filename,
  ]);

  return result.rows[0];
};

/**
 * Update organization
 */
const updateOrganization = async (
  id,
  name,
  description,
  contact_email,
  logo_filename
) => {
  const query = `
    UPDATE organization
    SET
      name=$1,
      description=$2,
      contact_email=$3,
      logo_filename=$4
    WHERE organization_id=$5
    RETURNING *;
  `;

  const result = await db.query(query, [
    name,
    description,
    contact_email,
    logo_filename,
    id,
  ]);

  return result.rows[0];
};

/**
 * Get projects belonging to organization
 */
const getProjectsByOrganization = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      name,
      description,
      location,
      project_date
    FROM project
    WHERE organization_id=$1
    ORDER BY project_date;
  `;

  const result = await db.query(query, [organizationId]);

  return result.rows;
};

export {
  getAllOrganizations,
  getOrganizationById,
  createOrganization,
  updateOrganization,
  getProjectsByOrganization,
};