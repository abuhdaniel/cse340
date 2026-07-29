import db from "./db.js";

/**
 * Register a new user
 */
const registerUser = async (
  user_name,
  user_email,
  user_password,
  user_role = "user"
) => {
  const query = `
    INSERT INTO users
      (user_name, user_email, user_password, user_role)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *;
  `;

  const result = await db.query(query, [
    user_name,
    user_email,
    user_password,
    user_role,
  ]);

  return result.rows[0];
};

/**
 * Find user by email
 */
const getUserByEmail = async (user_email) => {
  const query = `
    SELECT *
    FROM users
    WHERE user_email = $1;
  `;

  const result = await db.query(query, [user_email]);

  return result.rows[0];
};

/**
 * Find user by ID
 */
const getUserById = async (user_id) => {
  const query = `
    SELECT *
    FROM users
    WHERE user_id = $1;
  `;

  const result = await db.query(query, [user_id]);

  return result.rows[0];
};

/**
 * Get all users
 */
const getAllUsers = async () => {
  const query = `
    SELECT
      user_id,
      user_name,
      user_email,
      user_role,
      created_at
    FROM users
    ORDER BY user_name;
  `;

  const result = await db.query(query);

  return result.rows;
};

export {
  registerUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
};