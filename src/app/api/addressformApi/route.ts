import { connectDB } from "@/helper/connectDB";
import { User } from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email, formData } = await request.json();
    const {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      zipCode,
      telephone,
    } = formData;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 409 });
    }
    user.shippingAddress = {
      firstName: firstName,
      lastName: lastName,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      country: country,
      state: state,
      zipCode: zipCode,
      telephone: telephone,
    };

    await user.save();
    return NextResponse.json(
      { message: "address created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: error?.response?.data?.message },
      { status: 501 }
    );
  }
}
