import { body } from "express-validator";

/**
 * Validation rules for creating/updating a project
 */
const projectRules = () => {
  return [
    body("organization_id")
      .notEmpty()
      .withMessage("Please select an organization."),

    body("name")
      .trim()
      .notEmpty()
      .withMessage("Project name is required.")
      .isLength({ min: 3, max: 100 })
      .withMessage("Project name must be between 3 and 100 characters."),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Project description is required.")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters."),

    body("location")
      .trim()
      .notEmpty()
      .withMessage("Location is required.")
      .isLength({ min: 2, max: 100 })
      .withMessage("Location must be between 2 and 100 characters."),

    body("project_date")
      .notEmpty()
      .withMessage("Project date is required.")
      .isISO8601()
      .withMessage("Please enter a valid project date."),
  ];
};

export { projectRules };