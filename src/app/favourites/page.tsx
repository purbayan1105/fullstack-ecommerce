"use client";

import AddToCartHandle, { ContextProps } from "@/components/AddtoCartHandle";

import UserContext from "@/context/userContext";
import { favaddFn, getFavouriteProduct } from "@/services/userServ";

import { Spinner } from "@nextui-org/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { IoHeartDislikeOutline } from "react-icons/io5";

const page = () => {
  const context = useContext(UserContext) as ContextProps;
  const queryClient = useQueryClient();

  const { data, isLoading, isError, isFetching, isSuccess, isFetched } =
    useQuery({
      queryKey: ["favourite fetching"],
      queryFn: async () => {
        const favProducts = await getFavouriteProduct(context.user.data.email);

        return favProducts.data;
      },
    });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  const favHanlder = async (id: any) => {
    const product = data?.find((item: any) => item.sku === id);
    await favaddFn({
      email: context.user.data.email,
      product,
    });

    console.log(data);

    queryClient.refetchQueries();
  };

  return (
    <>
      <div className="min-h-screen py-8">
        <div className="text-3xl font-bold capriola my-6 text-center">
          Favourite Products
        </div>
        <div className="grid lg:grid-cols-3 mx-8 gap-5 mb-6">
          {data && data.length > 0 ? (
            data.map((item: any) => {
              return (
                <div
                  className="px-3 py-3 bg-gradient-to-tr from-gray-100 via-gray-200 to-slate-200 my-5"
                  key={item._id}>
                  <div className="flex justify-center">
                    <Image
                      src={item.imageUrls[0]}
                      alt={item.title}
                      height={200}
                      width={200}
                      className="w-auto h-[300px]  "
                    />
                  </div>

                  <div className="h-[0.1rem] w-full bg-gray-400"></div>
                  <div className="space-y-3">
                    <div className="text-xl font-semibold mt-5">
                      {item.title}
                    </div>
                    {item.description.length <= 70 ? (
                      <div className="">{item.description}</div>
                    ) : (
                      <div className="">{item.description.slice(0, 70)}...</div>
                    )}

                    <div className="">{item.price}</div>
                    <div className="space-y-4">
                      <button
                        className="bg-pink-700 px-3 py-2 w-full flex justify-center text-white rounded-lg text-xl"
                        onClick={() => favHanlder(item.sku)}>
                        {item.isFavourite ? (
                          <p>Remove Favourite</p>
                        ) : (
                          <p> Favourite</p>
                        )}
                      </button>
                      <AddToCartHandle product={item} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center h-[50vh] text-2xl font-normal">
              <IoHeartDislikeOutline size={35} />
              <div className="">Empty Favourites</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
