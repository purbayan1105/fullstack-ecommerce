import { connectDB } from "@/helper/connectDB";
import { User } from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    const data = await request.json();
    const { email, id } = data;

    const findUser = await User.findOne({ email });

    console.log("User found:", findUser);
    console.log("Email:", email);
    console.log("Key:", typeof id);

    if (!findUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const foundItems = findUser.addToCart.filter(
      (item: any) => item._id.toString() !== id.toString()
    );

    findUser.addToCart = foundItems;
    await findUser.save();

    console.log("findUserCart", findUser.addToCart);

    return NextResponse.json({ message: findUser.addToCart });
  } catch (error) {
    console.error("Error in DELETE handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
