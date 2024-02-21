import { connect, disconnect } from "mongoose";
import env from "../utils/envValidation";

export const connectToDatabase = async () => {
  try {
    await connect(env.MONGO_URI);
    console.log("connected to db");
  } catch (error) {
    console.log("cant connect to db " + error);
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await disconnect();
  } catch (error) {
    console.log("cant disconnect from db " + error);
  }
};
