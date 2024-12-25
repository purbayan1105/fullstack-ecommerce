"use client";
import UserContext from "@/context/userContext";
import { shippingAddressFn } from "@/services/userServ";

import { submitAtom } from "@/utils/atoms";
import { useAtom } from "jotai";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

function AddressForm() {
  const [isSubmitted, setSubmitted] = useAtom(submitAtom);
  const context = useContext(UserContext) as any;

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    telephone: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);

    const email = context?.user?.data?.email; // here condition operator is important
    console.log(email);

    try {
      const response = await shippingAddressFn({
        email,
        formData,
      });

      toast.success(response.message);
    } catch (error: any) {
      console.log("error at addressform", error);
      toast.error(error.response.data.message);
    }
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg  mx-8 my-8 p-6 bg-gray-100 shadow-md rounded-lg">
      <div className="text-2xl text-orange-400 text-center font-semibold capriola mb-5 underline">
        Enter Your Address
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">First Name *</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Middle Name</label>
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Last Name *</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Address Line 1 *
        </label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Address Line 2
        </label>
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">City *</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          State / Province *
        </label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">
          Zip/Postal Code
        </label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Country *</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1">
          <option value="">Select</option>
          <option value="India">India</option>

          {/* Add more countries as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Telephone *</label>
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 mt-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
}

export default AddressForm;
