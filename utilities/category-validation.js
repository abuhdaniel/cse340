import { body } from "express-validator";

const categoryRules = () => {
  return [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Category name is required.")
      .isLength({ min: 3, max: 100 })
      .withMessage("Category name must be between 3 and 100 characters."),
  ];
};

export { categoryRules };