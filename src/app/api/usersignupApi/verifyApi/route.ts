import { connectDB } from "@/helper/connectDB";
import { User } from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email, verificationCode } = await request.json();

    const user = await User.findOne({ email });
    if (user.otpDetails.verificationCode === verificationCode) {
      user.isVerified = true;
      user.verificationCode = " ";
      await user.save();
      return NextResponse.json({ message: "OTP matched" }, { status: 200 });
    }

    if (user.verificationCode !== verificationCode) {
      throw new Error("OTP did not match");
    }

    if (user.otpDetails.expiry_of_otp > Date.now()) {
      throw new Error("OTP expired");
    }
  } catch (error: any) {
    console.log("error at verify user api", error);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
