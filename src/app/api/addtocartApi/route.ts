import { connectDB } from "@/helper/connectDB";

import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/userModel";

export async function POST(req: NextRequest) {
  await connectDB();

  const { email, product } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingCartItem = user.addToCart.find(
      (item: any) => item.productId.toString() === product._id.toString()
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1; // Increment quantity if item exists
    } else {
      // Add a new item to the cart with required fields

      user.addToCart.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        description: product.description,
        imageUrls: product.imageUrls,
        isChecked: true,
        isCheckedOut: false,
        quantity: 1,
      });
    }

    await user.save();
    return NextResponse.json(
      { message: "Cart updated successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error at post add to cartapi", error },
      { status: 500 }
    );
  }
}

interface TokenPayload extends JwtPayload {
  email: string;
  _id: string;
}

export async function GET(request: NextRequest) {
  const userToken = request.cookies.get("userauthtoken")?.value;

  if (!userToken) {
    return NextResponse.json({ message: "Token not found" }, { status: 401 });
  }

  try {
    // Verify the token and cast to the expected type
    const data = jwt.verify(
      userToken,
      process.env.JWT_KEY || ""
    ) as TokenPayload;

    // If data contains email, return it; otherwise, handle as an error
    if (data && data.email) {
      console.log(data.email);
      const foundUser = await User.findOne({ _id: data.id }); // You need to know in which way it's stored there in api.

      let CartItem = [];
      CartItem = foundUser.addToCart;

      return NextResponse.json(CartItem, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid token data" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log("Error in addtocartAPI:", error);
    return NextResponse.json(
      { message: "Token verification error" },
      { status: 501 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  await connectDB();
  const { email, id, quantity, isChecked, operation } = await request.json();
  console.log("id", id);

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new Error("User Not Found");
  } else {
    try {
      // console.log(findUser.addToCart);
      let findItem = findUser.addToCart.find(
        (item: any) => item._id.toString() === id.toString()
      );
      if (!findItem) {
        throw new Error("Item not found");
      }
      if (operation === "quantity-update") {
        findItem.quantity = quantity;
      } else if (operation === "isCheckedStatus") {
        findItem.isChecked = isChecked;
      }
      await findUser.save();

      console.log("findUser", findItem);

      return NextResponse.json({ message: " successful" }, { status: 200 });
    } catch (error: any) {
      console.log("error add to cart api, PATCH", error);
      return NextResponse.json({ message: error.message }, { status: 501 });
    }
  }
}

// Update this to your actual path
