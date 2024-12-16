import { connectDB } from "@/helper/connectDB";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "@/models/userModel";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "No User Found" }, { status: 501 });
    }
    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      return NextResponse.json({ message: "Wrong password" }, { status: 502 });
    } else {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        },
        process.env.JWT_KEY as string
      );

      const response = NextResponse.json(
        { message: "Login Successful" },
        { status: 200 }
      );
      response.cookies.set("userauthtoken", token);
      return response;
    }
  } catch (error) {
    console.log("error at login api", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
