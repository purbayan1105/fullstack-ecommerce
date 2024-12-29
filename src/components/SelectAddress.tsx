"use client";

import { Checkbox, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

import { useAtom } from "jotai";
import { checkAtom, submitAtom } from "@/utils/atoms";
import Payment from "./Payment";

const SelectAddress = () => {
  const [isChecked, setChecked] = useState(false);
  const [isSubmitted, setSubmitted] = useAtom(submitAtom);

  const { data, isLoading, isFetched, isSuccess, isFetching, isError } =
    useQuery({
      queryKey: ["Get-address"],
      queryFn: async () => {
        const response = await axios.get("/api/usersignupApi"); //done for this api only services not used.
        const result = response.data;
        console.log("result", result);

        return result;
      },
      refetchOnWindowFocus: false,
    });

  if (isError) {
    return (
      <>
        <div className="">Error Occured</div>
      </>
    );
  }

  if (isLoading || isFetching) {
    return (
      <>
        <div className="flex justify-center h-[20dvh]">
          <Spinner />
        </div>
      </>
    );
  }

  const onChangeHandler = () => {
    setChecked(!isChecked);
  };
  return (
    <>
      <div className="space-y-8">
        {data && data[0].shippingAddress && (
          <div className=" ">
            <div className="flex items-center">
              {isSubmitted ? (
                <></>
              ) : (
                <Checkbox
                  onChange={onChangeHandler}
                  isSelected={isChecked}></Checkbox>
              )}

              <div className="text-2xl font-semibold my-8 px-3">
                Same as previous address
              </div>
            </div>
            <div className="">
              <span className="font-semibold">
                {data[0].shippingAddress.firstName}{" "}
                {data[0].shippingAddress.lastName}
              </span>
              <div className=""> {data[0].shippingAddress.addressLine1}</div>
              <div className=""> {data[0].shippingAddress.zipCode}</div>
            </div>
          </div>
        )}
        {(isChecked || isSubmitted) && (
          <div>
            <Payment />
          </div>
        )}
      </div>
    </>
  );
};

export default SelectAddress;
