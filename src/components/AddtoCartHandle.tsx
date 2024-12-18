"use client";
import UserContext from "@/context/userContext";
import { addToCartFn } from "@/services/userServ";

import { TabItemProps } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";

export type ContextProps = {
  user: {
    data: {
      _id: string;
      email: string;
    };
  };
};

type CartItem = {
  cart: string;
  total: number;
};

const AddToCartHandle = ({ product }: { product: any }) => {
  const context = useContext(UserContext) as ContextProps;

  const addToCartHandler = async () => {
    const email = context.user?.data?.email;
    console.log(email);

    console.log({ ...product });

    if (email && product) {
      const result = await addToCartFn({
        email,
        product,
      });
      console.log(result); // For debugging or to show a success message
    }
  };

  // const result = await addToCartFn({ email, cardid });

  return (
    <button
      className="text-lg bg-gray-800 text-white px-3 py-2 rounded-lg w-full"
      onClick={addToCartHandler}>
      Add To Cart
    </button>
  );
};

export default AddToCartHandle;
