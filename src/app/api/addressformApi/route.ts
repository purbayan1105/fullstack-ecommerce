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

    // console.log(email);

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
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
      { message: "error at creating address" },
      { status: 501 }
    );
  }
}
