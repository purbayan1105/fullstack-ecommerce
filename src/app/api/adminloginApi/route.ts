import { connectDB } from "@/helper/connectDB";
import { Admin } from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connectDB();
  const { email, password } = await request.json();
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Admin not found");
    }

    const isMatched = bcrypt.compareSync(password, admin.password);
    if (!isMatched) {
      throw new Error("Password does not match");
    }
    const response = NextResponse.json(
      { message: "Login Successful" },
      { status: 200 }
    );

    const adminToken = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_KEY as string
    );

    response.cookies.set("adminauthToken", adminToken);
    return response;
  } catch (error: any) {
    console.log("error at admin login api", error.message);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
