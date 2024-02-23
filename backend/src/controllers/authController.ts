import { RequestHandler } from "express";
import User from "../models/userModel";
import createHttpError from "http-errors";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager";

interface signupParams {
  name: string;
  email: string;
  password: string;
}
export const signupUser: RequestHandler<
  unknown,
  unknown,
  signupParams,
  unknown
> = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw createHttpError(400, "user already exist");
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    user.save();

    const token = createToken(user._id.toString(), user.email, "7d");

    res.clearCookie("auth_token", {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      signed: true,
    });
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      expires,
      signed: true,
    });
    res.status(201).json({ name: user.name, email: user.email });
  } catch (error) {
    next(error);
  }
};

interface signinParams {
  email: string;
  password: string;
}

export const signinUser: RequestHandler<
  unknown,
  unknown,
  signinParams,
  unknown
> = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw createHttpError(400, "User not reqisterd");
    }

    const validatePassword = compare(password, user.password);
    if (!validatePassword) {
      throw createHttpError(400, "Incorrect Password");
    }
    const token = createToken(user._id.toString(), user._id.toString(), "7d");
    res.clearCookie("auth_token", {
      httpOnly: true,
      signed: true,
      path: "/",
      domain: "localhost",
    });
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("auth_token", token, {
      httpOnly: true,
      signed: true,
      path: "/",
      domain: "localhost",
      expires,
    });
    res.status(201).json({ name: user.name, email: user.email });
  } catch (error) {
    next(error);
  }
};

export const verifyUser: RequestHandler = async (req, res, next) => {
  try {
    console.log("start");

    console.log(res.locals.jwtData.id);

    const user = await User.findById(res.locals.jwtData.id);
    console.log(user);

    if (!user) {
      throw createHttpError(401, "user note registerd or token malfunctioned");
    }

    if (res.locals.jwtData.id !== user._id.toString()) {
      throw createHttpError(401, "Permission didn't match");
    }
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    next(error);
  }
};

export const logoutUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      throw createHttpError(401, "user note registerd or token malfunctioned");
    }
    if (res.locals.jwtData.id !== user._id.toString()) {
      throw createHttpError(401, "Permission didn't match");
    }
    res.clearCookie("auth_token", {
      httpOnly: true,
      signed: true,
      path: "/",
      domain: "localhost",
    });
    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    next(error);
  }
};
