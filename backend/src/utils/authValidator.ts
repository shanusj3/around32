import { NextFunction, Request, Response, json } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      for (let validation of validations) {
        await validation.run(req);
      }
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      return res.status(422).json({ error: errors.array() });
    } catch (error) {
      next(error);
    }
  };
};

export const signinValidator = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password Should conatain atleast 6 characters"),
];
export const signupValidator = [
  body("name").notEmpty().withMessage("Name is Required"),
  ...signinValidator,
];
