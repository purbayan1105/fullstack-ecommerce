"use client";
import UserContext from "@/context/userContext";
import { getOrderItemsFn } from "@/services/createorderServ";
import { deleteOrderFn } from "@/services/userServ";

import { Spinner } from "@nextui-org/react";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext } from "react";

const page = () => {
  const context = useContext(UserContext) as any;

  const queryClient = useQueryClient();

  console.log("context", context);
  const params = useParams();
  const { email } = params;

  const decodedEmail = decodeURIComponent(email as string);
  console.log(decodedEmail);

  const { data, isLoading, isFetching, isSuccess, isFetched, isError } =
    useQuery({
      queryKey: ["get-orders"],
      queryFn: async () => {
        const orderItems = await getOrderItemsFn();

        return orderItems;
      },
      refetchOnWindowFocus: false,
    });

  if (isLoading || isFetching) {
    console.log("fetching");

    <div className="">
      <Spinner size="lg" />
    </div>;
  }

  if (isError) {
    console.log("error occured");
  }

  if (isFetched && isSuccess) {
    console.log("data", data);
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-[70dvh] font-semibold capriola text-2xl">
        Wait...
      </div>
    );
  }

  // cancel order Handler

  const cancelOrderhandle = async (productId: any, orderId: any) => {
    console.log(productId);
    console.log(orderId);
    console.log(context.user.data.id);

    const response = await deleteOrderFn({
      productId,
      orderId,
      userId: context.user.data.id,
    });
    console.log("response", response);
    queryClient.refetchQueries();
  };
  return (
    <>
      <div className="text-3xl font-semibold capriola text-center mt-5 py-6">
        Order Items
      </div>
      <p className="mx-16 text-orange-600">
        Total Ordered Items: <span className="font-semibold"></span>
      </p>
      <div className="w-[60%]  mt-16 min-h-screen">
        {data.map((item: any) => {
          return (
            <div key={item.orderId}>
              {" "}
              {item.placedItems.map((placedItem: any) => {
                return (
                  <div
                    className="grid grid-cols-2 justify-start"
                    key={placedItem._id}>
                    <Image
                      src={placedItem.imageUrls[0]}
                      alt=""
                      height={400}
                      width={300}
                      className="w-[250px] h-[300px]"
                    />
                    <div className="space-y-8">
                      <div className="text-2xl font-semibold">
                        {placedItem.title}
                      </div>
                      <div className="text-lg">
                        {placedItem.description.length > 70
                          ? placedItem.description.slice(0, 70) + "..."
                          : placedItem.description.length}
                      </div>

                      <button
                        className="bg-gray-300 text-black px-3 py-2 rounded-lg shadow-md text-lg"
                        onClick={() =>
                          cancelOrderhandle(placedItem.productId, item.orderId)
                        }>
                        Cancel Order
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
