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
export async function addToCartFn({ email, product }: any) {
  try {
    const response = await httpAxios.post("/api/addtocartApi", {
      email,
      product,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function favaddFn({ email, product }: any) {
  const response = await httpAxios.post("/api/favouriteApi", {
    email,
    product,
  });
  return response.data;
}

export async function favdeleteFn({ email, product }: any) {
  const response = await httpAxios.patch("/api/favouriteApi", {
    email,
    product,
  });
  return response.data;
}

export async function getFavouriteProduct(email: String) {
  const response = await httpAxios.get("/api/favouriteApi", {
    params: { email },
  });
  return response.data;
}

export async function getCartFn() {
  const response = await httpAxios.get("/api/addtocartApi");
  return response.data;
}
export async function updateQuantityFn({
  email,
  id,
  quantity,
  operation,
}: any) {
  try {
    const response = await httpAxios.patch("/api/addtocartApi", {
      email,
      id,
      quantity,
      operation,
    });
    return response.data;
  } catch (error: any) {
    console.log("error at add to cart api patch", error);
  }
}
export async function checkBoxFn({ email, id, isChecked, operation }: any) {
  const response = await httpAxios.patch("/api/addtocartApi", {
    email,
    id,
    isChecked,
    operation,
  });
  return response.data;
}

export async function deleteItemFromCartFn(data: any) {
  const response = await httpAxios.patch("/api/deleteCartApi", data);
  return response.data;
}

export async function shippingAddressFn({ email, formData }: any) {
  const response = await httpAxios.post("/api/addressformApi", {
    email,
    formData,
  });
  return response.data;
}
