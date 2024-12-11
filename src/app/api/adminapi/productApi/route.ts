import { connectDB } from "@/helper/connectDB";
import { AddProducts } from "@/models/productModel";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await connectDB();
  let allProducts = [];
  allProducts = await AddProducts.find();
  return NextResponse.json({ data: allProducts }, { status: 200 });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const adminAuthToken = request.cookies.get("adminauthToken")?.value;

  try {
    const { title, description, price, stocks, category, imageUrls, sku } =
      await request.json();

    let product = await AddProducts.findOne({ sku });
    if (product) {
      throw new Error("Product already exists");
    } else if (!adminAuthToken) {
      throw new Error("Not an admin");
    } else {
      if (adminAuthToken) {
        product = await new AddProducts({
          title,
          description,
          price,
          stocks,
          category,
          sku,
          imageUrls,
        });

        await product.save();
        return NextResponse.json(
          { message: "Product is saved" },
          { status: 200 }
        );
      }
    }
  } catch (error: any) {
    console.log("error at productApi", error.message);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
