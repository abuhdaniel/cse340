import { getAllUsers } from "../src/models/users.js";

/**
 * Build the Users page (Admin only)
 */
const buildUsersPage = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.render("users/index", {
      title: "Registered Users",
      users,
      user: req.session.user,
    });
  } catch (error) {
    console.error(error);

    req.flash("error", "Unable to retrieve users.");

    res.redirect("/dashboard");
  }
};

export {
  buildUsersPage,
};