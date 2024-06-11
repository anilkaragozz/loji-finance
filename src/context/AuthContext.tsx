import { createContext, useContext, useReducer, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";
import { LoginData } from "@/pages/auth/Login";
import { RegisterData } from "@/pages/auth/Register";
import { axiosClient } from "@/services/api";

type AuthState = {
  accessToken: string | null;
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; accessToken: string }
  | { type: "REGISTER_SUCCESS"; accessToken: string }
  | { type: "LOGOUT" };

type AuthContextType = {
  state: AuthState;
  login: (request: LoginData) => Promise<void>;
  register: (request: RegisterData) => Promise<void>;
  logout: () => void;
};

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("accessToken", action.accessToken);
      return { ...state, accessToken: action.accessToken };
    case "LOGOUT":
      localStorage.removeItem("accessToken");
      return { ...state, accessToken: null };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (request: LoginData) => {
    try {
      const response = await axiosClient.post("/auth/login", request);
      dispatch({ type: "LOGIN_SUCCESS", accessToken: response.data.data });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  const register = async (request: RegisterData) => {
    try {
      const response = await axiosClient.post("/auth/register", request);
      dispatch({ type: "REGISTER_SUCCESS", accessToken: response.data.data });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
