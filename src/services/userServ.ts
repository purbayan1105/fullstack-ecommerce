import { httpAxios } from "./axiosInstance";

export async function userSignup(signupData: any) {
  const response = await httpAxios.post("/api/usersignupApi", signupData);
  return response.data;
}
export async function verifyUser({ email, verificationCode }: any) {
  const response = await httpAxios.post("/api/usersignupApi/verifyApi", {
    email,
    verificationCode,
  });
  return response.data;
}

export async function userloginService(loginData: any) {
  const response = await httpAxios.post("/api/loginApi", loginData);
  return response.data;
}

export async function currentUser() {
  const response = await httpAxios.get("/api/current");
  return response.data;
}

export async function logoutUser() {
  const response = await httpAxios.post("/api/logoutApi");
  return response.data;
}
