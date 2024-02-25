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
    console.log("request recive");

    const token = await req.signedCookies["auth_token"];
    console.log(token);

    if (!token || token.trim() === "") {
      console.log("error");
      return console.log(401, "Token not received");
    }

    jwt.verify(token, env.JWT_SECRETE, (err: any, success: any) => {
      if (err) {
        next(createHttpError(401, "Token expired"));
      } else {
        res.locals.jwtData = success;
        console.log(token);

        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
