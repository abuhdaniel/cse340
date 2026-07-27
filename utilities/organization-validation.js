import { body } from "express-validator";

const organizationRules = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Organization name is required.")
      .isLength({ min: 3, max: 100 })
      .withMessage("Organization name must be between 3 and 100 characters."),

    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required."),

    body("contact_email")
      .trim()
      .isEmail()
      .withMessage("A valid email address is required."),

    body("logo_filename")
      .trim()
      .notEmpty()
      .withMessage("Logo filename is required."),
  ];
};

export { organizationRules };