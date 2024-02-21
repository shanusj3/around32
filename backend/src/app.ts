import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import appRoutes from "./routes";
import cookieParsor from "cookie-parser";
import env from "./utils/envValidation";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParsor(env.COOKIE_SECRETE));

// route middleware
app.use("/api/v1/routes", appRoutes);

// error handling
app.use((_req, _res, next) => next(createHttpError(404, "Endpoint Not Found")));
app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let errorMessage = "An Unknown Error Occured";
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json(errorMessage);
});

export default app;
