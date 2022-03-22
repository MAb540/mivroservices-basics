import { body } from "express-validator";

export function signUpValidation() {
  return [
    body("email").isEmail().withMessage("Email must by valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ];
}
