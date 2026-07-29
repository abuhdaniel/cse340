/**
 * Middleware to require a logged-in user
 */
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    req.flash("error", "Please log in to continue.");
    return res.redirect("/login");
  }

  next();
};

/**
 * Middleware factory to require a specific role
 */
const requireRole = (role) => {
  return (req, res, next) => {
    // User not logged in
    if (!req.session.user) {
      req.flash("error", "Please log in to continue.");
      return res.redirect("/login");
    }

    // User does not have required role
    if (req.session.user.role !== role) {
      req.flash(
        "error",
        "You do not have permission to access this page."
      );
      return res.redirect("/dashboard");
    }

    next();
  };
};

export {
  requireLogin,
  requireRole,
};