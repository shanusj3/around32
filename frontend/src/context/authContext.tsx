import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
} from "../helpers/api-communications";
import { ApiError, getError } from "../utils/erros";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [err, setErr] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkStatus = async () => {
    const data = await checkAuthStatus();
    if (data) {
      setUser({
        email: data.email,
        name: data.name,
      });
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const login = async (email: string, password: string) => {
    toast.loading("Signing", { id: "login" });
    const data = await loginUser(email, password);
    if (data) {
      setUser({
        email: data.email,
        name: data.name,
      });
      setIsLoggedIn(true);
      toast.success("Login Successfully", { id: "login" });
    }
  };
  const signup = async (name: string, email: string, password: string) => {};
  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
