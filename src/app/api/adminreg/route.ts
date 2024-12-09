import { connectDB } from "@/helper/connectDB";
import { Admin } from "@/models/adminModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const admin = await new Admin({
      email: "purbayan.kol@gmail.com",
      password: bcrypt.hashSync("pgadmin", 10),
    });

    await admin.save();

    return NextResponse.json({ message: admin }, { status: 200 });
  } catch (error: any) {
    console.log("error at adminreg api: ", error.message);
  }
}
