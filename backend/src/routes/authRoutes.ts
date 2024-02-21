import { Router } from "express";
import * as authController from "../controllers/authController";
import {
  signinValidator,
  signupValidator,
  validate,
} from "../utils/authValidator";

const authRoutes = Router();
// signup
authRoutes.post(
  "/signup",
  validate(signupValidator),
  authController.signupUser
);
// siagnin
authRoutes.post(
  "/signin",
  validate(signinValidator),
  authController.signinUser
);
// verifyuser

// logout
export default authRoutes;
