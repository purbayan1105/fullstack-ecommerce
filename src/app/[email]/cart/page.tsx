"use client";
import CartItem from "@/components/CartItem";
import UserContext from "@/context/userContext";
import { getCartFn, updateQuantityFn } from "@/services/userServ";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { BiSolidCommentError } from "react-icons/bi";

const page = () => {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { data, isLoading, isError, isFetched, isFetching } = useQuery({
    queryKey: ["cart-fetching"],
    queryFn: async () => {
      const response = await getCartFn();
      console.log(response);
      return response;
    },
    refetchOnWindowFocus: false,
  });
  console.log("data", data);

  useEffect(() => {
    if (isLoading || isFetching) {
      setLoading(true);
      if (isFetched) {
        setLoading(false);
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center h-[70dvh] flex-col">
          <Spinner size="lg" />
          <p className="text-xl text-gray-800 font-semibold gap-2">
            Loading...
          </p>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="flex justify-center items-center h-[70dvh]">
          <p className="text-xl text-gray-800 font-semibold gap-2">
            Error Occured, Try again later
          </p>
          <BiSolidCommentError size={30} />
        </div>
      </>
    );
  }

  return (
    <>
      <CartItem data={data} />
    </>
  );
};

export default page;
