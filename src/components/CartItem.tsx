import UserContext from "@/context/userContext";

import {
  checkBoxFn,
  deleteItemFromCartFn,
  updateQuantityFn,
} from "@/services/userServ";

import { shippingCostAtom, subTotalAtom, totalAtom } from "@/utils/atoms";

import { Checkbox, Spinner } from "@nextui-org/react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";

type CartItemProps = {
  _id: string;
  title: string;
  description: string;
  price: string;
  imageUrls: string[];
  quantity: number;
  isChecked: boolean;
};

const CartItem = ({ data }: { data: CartItemProps[] }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const context = useContext(UserContext) as any;
  const queryClient = useQueryClient();
  console.log(context);

  const plusHandler = async (key: any) => {
    setLoadingId(key);
    const targetedItem = data.find((item: CartItemProps) => item._id === key);
    console.log("targetedItem", targetedItem?._id);

    if (!targetedItem) {
      console.log("Item not found in the cart data");
      return;
    }
    try {
      await updateQuantityFn({
        email: context.user.data.email,
        id: targetedItem._id,
        quantity: targetedItem.quantity + 1,
        operation: "quantity-update",
      });
      queryClient.refetchQueries();

      setLoadingId(null);
    } catch (error) {
      console.log("cart", error);
    }
  };
  const minusHandler = async (key: any) => {
    setLoadingId(key);
    const targetedItem = data.find((item: CartItemProps) => item._id === key);
    console.log("targetedItem", targetedItem?._id);

    if (!targetedItem) {
      console.log("Item not found in the cart data");
      return;
    }
    try {
      await updateQuantityFn({
        email: context.user.data.email,
        id: targetedItem._id,
        quantity: targetedItem.quantity - 1,
        operation: "quantity-update",
      });
      queryClient.refetchQueries();
      setLoadingId(null);
    } catch (error) {
      console.log("cart", error);
    }
  };

  const deleteHandler = async (key: any) => {
    // Find the targeted item by key
    const targetedItem = data.find((item: CartItemProps) => item._id === key);

    // Exit if no item matches the key
    if (!targetedItem) {
      console.log("Targeted item not found.");
      return;
    }

    // Debug logs to confirm data
    console.log("User email:", context.user.data.email);
    console.log("Key:", key);

    // Construct the object to send to deleteFn
    const targetForDelete = {
      email: context.user.data.email,
      id: targetedItem._id,
    };

    try {
      // Call the delete function and log result
      const result = await deleteItemFromCartFn(targetForDelete);
      console.log("Delete result:", result);

      queryClient.refetchQueries();
    } catch (error: any) {
      console.error("Error in deleteHandler:", error.response.data.message);
    }
  };

  // CALCULATE THE TOTAL BILL
  const [shippingCost, setShippingCost] = useAtom(shippingCostAtom);
  const [total, setTotal] = useAtom(totalAtom);
  const [subTotal, setSubTotal] = useAtom(subTotalAtom);

  let totalCart = data.reduce(
    (acc: any, item: CartItemProps) =>
      acc + parseFloat(item.price) * (item.isChecked ? item.quantity : 0),
    0
  );

  useEffect(() => {
    setSubTotal(parseFloat(totalCart));
  }, [data]);

  useEffect(() => {
    if (subTotal > 0 && subTotal < 499) {
      setShippingCost(199);
    } else {
      setShippingCost(0);
    }
  }, [data, subTotal]);
  useEffect(() => {
    setTotal(subTotal + shippingCost);
  }, [data, subTotal, shippingCost]);

  //CHECKBOX Function................................................................

  const checkboxHandler = async (id: any) => {
    console.log(id);

    const targetedItem = data.find((item: CartItemProps) => item._id === id);

    const email = context.user.data.email;
    const isChecked = !targetedItem?.isChecked;

    const result = await checkBoxFn({
      email,
      id,
      isChecked,
      operation: "isCheckedStatus",
    });
    queryClient.refetchQueries();
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 grid-cols-1  px-4 lg:px-10 space-x-5 min-h-[70dvh]">
        <div className="lg:col-span-2 space-y-6 py-6">
          {data.map((cartItem: CartItemProps) => {
            return (
              <div className="" key={cartItem._id}>
                <div className=" grid grid-cols-2 space-x-14 relative">
                  <div className="bg-violet-50 px-2 py-2 rounded-md flex justify-center items-center">
                    <Image
                      src={cartItem.imageUrls[0]}
                      alt=""
                      height={500}
                      width={500}
                      className="w-[100px] h-[100px] lg:w-[250px] lg:h-[250px]"
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="text-xl capriola text-left">
                      {cartItem.title}
                    </div>
                    <div className="flex items-center gap-2 text-xl">
                      <p>{cartItem.price}</p>
                      <LiaRupeeSignSolid size={30} />
                    </div>
                    <div className="flex text-lg lg:text-2xl w-full">
                      <button
                        className="bg-black text-white px-2 py-1 rounded-l-lg w-8"
                        onClick={() => plusHandler(cartItem._id)}>
                        +
                      </button>
                      <button className="border-2 border-solid border-black px-2 py-1">
                        {loadingId === cartItem._id ? (
                          <>
                            <Spinner />
                          </>
                        ) : (
                          <>{cartItem.quantity}</>
                        )}
                      </button>

                      {cartItem.quantity === 1 ? (
                        <button
                          className=" bg-black text-white px-3 py-1 rounded-r-lg"
                          onClick={() => deleteHandler(cartItem._id)}>
                          <MdDelete
                            size={25}
                            onClick={() => deleteHandler(cartItem._id)}
                          />
                        </button>
                      ) : (
                        <button
                          className=" bg-black text-white px-3 py-1 rounded-r-lg"
                          onClick={() => minusHandler(cartItem._id)}>
                          -
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="lg:absolute lg:right-6 lg:bottom-1 hidden">
                    <MdDelete
                      size={25}
                      onClick={() => deleteHandler(cartItem._id)}
                    />
                  </div>

                  <div className="absolute top-1 lg:right-1 right-[8rem] z-1 0">
                    <Checkbox
                      color="success"
                      size="lg"
                      key={cartItem._id}
                      isSelected={cartItem.isChecked}
                      onChange={() => checkboxHandler(cartItem._id)}></Checkbox>
                  </div>
                </div>

                <hr />
              </div>
            );
          })}
        </div>

        {/*....................................... TOtal Bill Section.................................................. */}
        <div className="h-auto lg:pt-8 lg:px-5  lg:py-0 py-5">
          <h2 className=" flex justify-center text-2xl font-semibold  bg-purple-300 text-black py-1">
            {" "}
            Total Bill
          </h2>

          <div className="space-y-7 bg-gray-100 py-5 px-5">
            <div className=" grid grid-cols-3 justify-center items-center text-lg">
              <p className="font-semibold">SubTotal</p>
              <span className="flex justify-center"> {subTotal}</span>
              <span>
                {" "}
                <LiaRupeeSignSolid size={20} />
              </span>
            </div>
            <hr />
            <div className=" grid grid-cols-3 justify-center items-center text-lg">
              {" "}
              <p className="font-semibold">Shipping Cost</p>
              <span className="flex justify-center"> {shippingCost}</span>
              <span>
                {" "}
                <LiaRupeeSignSolid size={20} />
              </span>
            </div>
            <hr />
            <div className=" grid grid-cols-3 justify-center items-center text-lg">
              <p className="font-semibold">Total</p>
              <span className="flex justify-center">{total}</span>
              <span>
                {" "}
                <LiaRupeeSignSolid size={20} />
              </span>
            </div>
          </div>
          <Link href="/payment-gateway">
            <button className="bg-orange-400 w-full shadow-md shadow-gray-400 text-xl py-2 mt-3 font-semibold  rounded-lg">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartItem;
