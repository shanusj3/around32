import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import {
  createBlog,
  getAllBlogs,
  getBlog,
  getFeatuedBlogs,
} from "../controllers/blogControllers";

const blogRoutes = Router();

blogRoutes.get("/", getAllBlogs);
blogRoutes.get("/featured", getFeatuedBlogs);
blogRoutes.get("/:blogId", getBlog);
blogRoutes.post("/create", verifyToken, createBlog);

export default blogRoutes;
