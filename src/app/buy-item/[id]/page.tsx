"use client";

import AddressForm from "@/components/AddressForm";
import SelectAddress from "@/components/SelectAddress";
import userContext from "@/context/userContext";
import { getProducts } from "@/services/addProductServ";
import { createOrderFn, placedItemsFn } from "@/services/createorderServ";
import { getCartFn } from "@/services/userServ";
import { submitAtom } from "@/utils/atoms";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Suspense, useContext, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [isSubmitted, setSubmitted] = useAtom(submitAtom);
  const [isProccesing, setProcessing] = useState(false);
  const context = useContext(userContext) as any;
  const router = useRouter();

  //   id is not a part of the string so,
  const params = useParams();
  const { id } = params;

  console.log("id", id);

  const { data, isLoading, isFetching, isFetched, isSuccess } = useQuery({
    queryKey: ["fetch-user-data"],
    queryFn: async () => {
      const response = await getProducts();
      console.log("response", response);

      const targetedItem = response.data.find(
        (item: any) => item._id.toString() === id?.toString()
      );
      console.log("targetedItem", targetedItem);

      return targetedItem;
    },
    refetchOnWindowFocus: false,
  });
  if (isLoading || isFetching) {
    <div className="">
      <Spinner />
    </div>;
  }

  const handlePayment = async () => {
    setProcessing(true);
    let Amount = data.price;
    try {
      //
      const response = await createOrderFn({ amount: Amount, currency: "INR" });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID,
        amount: data.price,
        currency: "INR",
        name: "Your compnay name",
        description: "Test transaction",
        order_id: response.orderId,
        handler: async function (response: any) {
          console.log("payment successful", response);

          const orderedItems = [data];
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
      <div className="grid lg:grid-cols-2">
        <AddressForm />

        {data && isSubmitted && (
          <div className="bg-gray-200 w-[300px] h-[200px] mx-6 my-8 p-4 space-y-5">
            <div className="text-xl font-bold">Total Amount</div>
            <div className="">{data?.price}</div>
            <button
              className="bg-green-500 text-lg px-3 py-2 rounded-lg font-semibold"
              onClick={handlePayment}>
              Continue to pay
            </button>
          </div>
        )}
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
};

export default page;
