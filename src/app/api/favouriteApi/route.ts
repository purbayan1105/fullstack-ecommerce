import { connectDB } from "@/helper/connectDB";
import { User } from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { email, product } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const existingItem = user.favouriteItems.find(
      (item: any) => item.sku?.toString() === product.sku.toString()
    );

    if (existingItem) {
      const deletedFromFav = user.favouriteItems.filter(
        (item: any) => item !== existingItem
      );

      user.favouriteItems = deletedFromFav;
      await user.save();
      return NextResponse.json(
        { message: "Item deleted from favourites" },
        { status: 201 }
      );
    } else {
      user.favouriteItems.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        description: product.description,
        sku: product.sku,
        imageUrls: product.imageUrls,
      });

      await user.save();
      return NextResponse.json(
        { message: "Item added to favourites" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}

export async function GET(request: NextRequest) {
  await connectDB();
  const email = request.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ data: "email not found" }, { status: 501 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ data: "user not found" }, { status: 501 });
  }
  return NextResponse.json({ data: user.favouriteItems }, { status: 200 });
}
