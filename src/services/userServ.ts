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
