import { Router } from "express";
import * as authController from "../controllers/authController";
import {
  signinValidator,
  signupValidator,
  validate,
} from "../utils/authValidator";
import { verifyToken } from "../utils/token-manager";

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
authRoutes.get("/auth-status", verifyToken, authController.verifyUser);
// logout
authRoutes.get("/logout", verifyToken, authController.logoutUser);

export default authRoutes;
