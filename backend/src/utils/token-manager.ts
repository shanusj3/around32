import jwt from "jsonwebtoken";
import env from "./envValidation";

export const createToken = (email: string, id: string, expiresIn: string) => {
  const payload = { email, id };
  const token = jwt.sign(payload, env.JWT_SECRETE, {
    expiresIn: expiresIn,
  });
  return token;
};
