import { connectDB } from "@/helper/connectDB";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/userModel";
import { sendVerificationEmail } from "@/helper/sendMail";

interface TokenPayload extends JwtPayload {
  email: string;
  _id: string;
}
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const userToken = request.cookies.get("userauthtoken")?.value;

    if (!userToken) {
      throw new Error("No User Token Found");
    }

    const data = jwt.verify(
      userToken,
      process.env.JWT_KEY || ""
    ) as TokenPayload;

    if (data && data.email) {
      const findUser = await User.find({ email: data.email });
      if (!findUser) {
        throw new Error("User Not Found");
      }

      return NextResponse.json(findUser, { status: 200 });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { firstName, lastName, email, password, imageUrl, cart } =
      await request.json();

    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 409 }
      );
    } else {
      let hashedPassword = bcrypt.hashSync(password, 10);
      const verificationCode = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      const expiry_of_otp = Date.now() + 30 * 60 * 1000; //in miliseconds

      const otpDetails = {
        verificationCode,
        expiry_of_otp,
      };
      user = await new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        imageUrl,
        otpDetails,
        cart,
      });
      await user.save();
      await sendVerificationEmail(email, verificationCode);
      return NextResponse.json(
        { message: "user is registered" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log("error at usersignup-api", error);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
