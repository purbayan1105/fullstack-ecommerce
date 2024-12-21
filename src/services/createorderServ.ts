import { httpAxios } from "./axiosInstance";

export async function createOrderFn({ amount, currency }: any) {
  const response = await httpAxios.post("/api/create-order", {
    amount,
    currency,
  });

  return response.data;
}

export async function placedItemsFn({ orderedItems, userId, orderId }: any) {
  const response = await httpAxios.post("/api/orderPlacedApi", {
    orderedItems,
    userId,
    orderId,
  });
  return response.data;
}

export async function getOrderItemsFn() {
  const response = await httpAxios.get("/api/orderPlacedApi");
  return response.data;
}
