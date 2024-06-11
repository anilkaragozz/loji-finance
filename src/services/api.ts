import { LoginData } from "@/pages/auth/Login";
import { RegisterData } from "@/pages/auth/Register";
import axios from "axios";

const acccessToken = localStorage.getItem("accessToken");
const baseURL = "https://study.logiper.com";

const axiosClient = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${acccessToken}`,
  },
});

export const loginFn = async (request: LoginData) => {
  try {
    const response = await axiosClient.post("/auth/login", request);

    localStorage.setItem("accessToken", response.data.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const registerFn = async (request: RegisterData) => {
  try {
    const response = await axiosClient.post("/auth/register", request);
    return response.data;
  } catch (error) {
    return error;
  }
};
