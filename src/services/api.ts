import axios from "axios";

const baseURL = "https://study.logiper.com";
const accessToken = localStorage.getItem("accessToken");

export const axiosClient = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
