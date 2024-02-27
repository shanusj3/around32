import { RequestHandler } from "express";
import Blogs from "../models/blogModels";
import createHttpError from "http-errors";
import User from "../models/userModel";

export const getAllBlogs: RequestHandler = async (req, res, next) => {
  try {
    const blogs = await Blogs.find().exec();
    if (!blogs) {
      throw createHttpError(400, "not blogs");
    }
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
export const getFeatuedBlogs: RequestHandler = async (req, res, next) => {
  try {
    const blogs = await Blogs.find().exec();
    if (!blogs) {
      throw createHttpError(400, "not blogs");
    }
    const featuredBlogs = blogs?.filter((val) => val.featured === true);
    res.status(200).json(featuredBlogs);
  } catch (error) {
    next(error);
  }
};

interface BlogId {
  blogId: string;
}
export const getBlog: RequestHandler<
  BlogId,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const blogId = req.params.blogId;
  console.log(blogId);

  try {
    const blogs = await Blogs.findById(blogId).exec();
    if (!blogs) {
      throw createHttpError(400, "not blogs found");
    }
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

interface BlogReq {
  heading: string;
  blog: string;
  category?: string[];
}

export const createBlog: RequestHandler<
  unknown,
  unknown,
  BlogReq,
  unknown
> = async (req, res, next) => {
  const { heading, blog, category } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      throw createHttpError(401, "user note registerd or token malfunctioned");
    }
    if (res.locals.jwtData.id !== user._id.toString()) {
      throw createHttpError(401, "Permission didn't match");
    }
    if (!category) {
      throw createHttpError(401, "no category found");
    }
    const newBlog = {
      heading: heading,
      image: "/assets/image2.jpg",
      author: user.name,
      featured: true,
      author_id: user._id.toString(),
      blog: blog,
      category,
    };
    const creatingBlog = new Blogs(newBlog);
    await creatingBlog.save();
    res.status(201).json(creatingBlog);
  } catch (error) {
    next(error);
  }
};
