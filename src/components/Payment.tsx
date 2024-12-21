"use client";

import { shippingCostAtom, subTotalAtom, totalAtom } from "@/utils/atoms";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { FaRupeeSign } from "react-icons/fa";
import { TabletsProps } from "./Tablet";
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

import Script from "next/script";
import UserContext from "@/context/userContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createOrderFn, placedItemsFn } from "@/services/createorderServ";
import { getCartFn } from "@/services/userServ";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Payment = () => {
  const router = useRouter();
  const context = useContext(UserContext) as any;

  console.log(context.user.data.email);

  const [loading, setLoading] = useState(false);
  const { data, isLoading, isFetching, isFetched, isSuccess } = useQuery({
    queryKey: ["fetch-user-data"],
    queryFn: async () => {
      const response = await getCartFn();
      const isCheckedItems = response.filter(
        (items: any) => items.isChecked === true
      );

      return isCheckedItems;
    },
    refetchOnWindowFocus: false,
  });

  console.log("data", data);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    setLoading(true);
  }, [isLoading, isFetching]);

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    if (data) {
      setLoading(false);
      let totalCart = data.reduce(
        (acc: any, item: any) =>
          acc + parseFloat(item.price) * (item.isChecked ? item.quantity : 0),
        0
      );
      setSubTotal(totalCart);
    }
  }, [data, isFetched, isSuccess]);

  const shippingCost = subTotal > 0 && subTotal < 499 ? 199 : 0;
  const isTotal = subTotal + shippingCost;

  // ...........................................Payemnt gateway script........................................

  // dont forget to declare global.

  const Amount = isTotal;
  const [isProccesing, setProcessing] = useState(false);
  const handlePayment = async () => {
    setProcessing(true);
    console.log(isTotal);

    try {
      //
      const response = await createOrderFn({ amount: Amount, currency: "INR" });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID,
        amount: Amount,
        currency: "INR",
        name: "Your compnay name",
        description: "Test transaction",
        order_id: response.orderId,
        handler: async function (response: any) {
          console.log("payment successful", response);

          const orderedItems = data.map((items: any) => items);
          console.log(this.order_id);

          console.log("orderedItems", orderedItems);
          console.log(response.orderId);

          try {
            const result = await placedItemsFn({
              userId: context.user.data.id,
              orderedItems,
              orderId: response.razorpay_order_id,
            });
            toast.success(result.message);
            router.push("/");
          } catch (error: any) {
            toast.error(error.response.data.message);
          }
        },
        prefill: {
          name: "John Doe",
          email: "abc@email.com",
          contact: 1234567890,
        },
        theme: {
          color: "red",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log("error at payment page", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 w-fit px-4 py-5 space-y-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">Total Amount:</span>{" "}
          <span className="text-2xl">{isTotal}</span>
          <FaRupeeSign size={25} />
        </div>
        <button
          className="bg-green-400 text-white text-xl font-semibold flex justify-center px-3 py-2 rounded-lg"
          onClick={handlePayment}>
          {isProccesing ? "Redirecting" : "Pay Now"}
        </button>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
};

export default Payment;
