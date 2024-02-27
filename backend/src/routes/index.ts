import { Router } from "express";
import authRoutes from "./authRoutes";
import blogRoutes from "./blogRoutes";

const appRoutes = Router();
appRoutes.use("/auth", authRoutes);
appRoutes.use("/blog", blogRoutes);

export default appRoutes;
