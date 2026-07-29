import bcrypt from "bcrypt";
import {
  registerUser,
  getUserByEmail,
} from "../src/models/users.js";

/**
 * Display Register Page
 */
const buildRegister = (req, res) => {
  res.render("auth/register", {
    title: "Register",
  });
};

/**
 * Display Login Page
 */
const buildLogin = (req, res) => {
  res.render("auth/login", {
    title: "Login",
  });
};

/**
 * Register New User
 */
const processRegister = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    // Check if email already exists
    const existingUser = await getUserByEmail(user_email);

    if (existingUser) {
      req.flash("error", "Email already exists.");
      return res.redirect("/register");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // Save user
    await registerUser(
      user_name,
      user_email,
      hashedPassword
    );

    req.flash(
      "success",
      "Registration successful. Please login."
    );

    return res.redirect("/login");
  } catch (error) {
    console.error(error);

    req.flash("error", "Unable to register.");

    return res.redirect("/register");
  }
};

/**
 * Login User
 */
const processLogin = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;

    const user = await getUserByEmail(user_email);

    if (!user) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/login");
    }

    const passwordMatch = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!passwordMatch) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/login");
    }

    // Regenerate session for security
    req.session.regenerate((err) => {
      if (err) {
        console.error(err);
        req.flash("error", "Login failed.");
        return res.redirect("/login");
      }

      req.session.user = {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
        role: user.user_role,
      };

      req.flash("success", "Welcome back!");

      return res.redirect("/dashboard");
    });
  } catch (error) {
    console.error(error);

    req.flash("error", "Login failed.");

    return res.redirect("/login");
  }
};

/**
 * Dashboard
 */
const buildDashboard = (req, res) => {
  res.render("auth/dashboard", {
    title: "Dashboard",
    user: req.session.user,
  });
};

/**
 * Logout
 */
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      req.flash("error", "Unable to log out.");
      return res.redirect("/dashboard");
    }

    res.clearCookie("connect.sid");
    return res.redirect("/");
  });
};

export {
  buildRegister,
  buildLogin,
  processRegister,
  processLogin,
  buildDashboard,
  logout,
};