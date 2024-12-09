import axios from "axios";

export const httpAxios = axios.create({
  baseURL: process.env.Base_URL as string,
});
