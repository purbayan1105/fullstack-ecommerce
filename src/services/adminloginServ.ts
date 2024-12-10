import { httpAxios } from "./axiosInstance";

export async function adminLoginService(loginData: any) {
  const response = await httpAxios.post("/api/adminloginApi", loginData);
  return response.data;
}

export async function adminLogoutService() {
  const response = await httpAxios.post("/api/adminLogoutApi");
  return response.data;
}
