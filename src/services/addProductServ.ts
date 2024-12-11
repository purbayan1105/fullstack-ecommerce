import { httpAxios } from "./axiosInstance";

export async function addproductService(productData: any) {
  const response = await httpAxios.post(
    "/api/adminapi/productApi",
    productData
  );
  return response.data;
}

export async function getProducts() {
  const response = await httpAxios.get("/api/adminapi/productApi");
  // console.log(response);
  return response.data;
}
