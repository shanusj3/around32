import jwt from "jsonwebtoken";
import env from "./envValidation";
import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { email, id };
  const token = jwt.sign(payload, env.JWT_SECRETE, {
    expiresIn: expiresIn,
  });
  return token;
};

export const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const token = req.signedCookies["auth_token"];
    if (!token || token.trim() === "") {
      throw createHttpError(401, "token not recived");
    }

    return new Promise<void>((reject, resolve) => {
      return jwt.verify(token, env.JWT_SECRETE, (err: any, success: any) => {
        if (err) {
          reject(err.message);
          throw createHttpError(401, "token expired");
        } else {
          resolve();
          res.locals.jwtData = success;
          next();
        }
      });
    });
  } catch (error) {
    next(error);
  }
};
