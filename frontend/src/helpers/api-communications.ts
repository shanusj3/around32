import axios from "axios";
import { ApiError, getError } from "../utils/erros";
import toast from "react-hot-toast";

export const loginUser = async (email: string, password: string) => {
  try {
    const res = await axios.post("/routes/auth/signin", {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    toast.error(getError(error as unknown as ApiError), { id: "login" });
  }
};
export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await axios.post("/routes/auth/signup", {
      name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    toast.error(getError(error as unknown as ApiError), { id: "signup" });
  }
};

export const checkAuthStatus = async () => {
  try {
    const res = await axios.post("/routes/auth/auth-status");
    return res.data;
  } catch (error) {
    getError(error as unknown as ApiError);
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.get("/routes/auth/logout");
    return res.data;
  } catch (error) {
    getError(error as unknown as ApiError);
  }
};
