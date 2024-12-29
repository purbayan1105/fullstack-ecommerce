import { connectDB } from "@/helper/connectDB";
import { Orders } from "@/models/OrderModel";
import { NextRequest, NextResponse } from "next/server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/userModel";
import { AddProducts } from "@/models/productModel";
import { allMails } from "@/helper/allMail";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { userId, orderedItems, orderId } = await request.json();

    console.log("orderedItems", orderedItems);
    console.log("orderId", orderId);
    console.log("userId", userId);

    const findUser = await User.findById(userId);
    const userEmail = findUser.email;

    let findOrder = await Orders.findOne({
      orderList: { $elemMatch: { userId } },
    }); //since user is not directly inside dindUser. So, this is important step.
    if (!findOrder) {
      // Create a new Orders document if none exists for the userId
      console.log("new user found");
      findOrder = new Orders({
        orderList: [
          {
            orderId: orderId,
            userId: userId,
            placedItems: orderedItems.map((item: any) => ({
              productId: item.productId || item._id,
              title: item.title,
              description: item.description,
              quantity: item.quantity,
              imageUrls: item.imageUrls,
            })),
          },
        ],
      });
    } else {
      console.log("same user found");

      findOrder.orderList.push({
        orderId: orderId,
        userId: userId,
        placedItems: orderedItems.map((item: any) => ({
          productId: item.productId || item._id,
          title: item.title,
          description: item.description,
          quantity: item.quantity,
          imageUrls: item.imageUrls,
        })),
      });
    }

    await findOrder.save();

    if (!findUser) {
      throw new Error("User not found");
    } else {
      findUser.placedOrders.push({
        orderId: orderId,
        userId: userId,
        placedItems: orderedItems.map((item: any) => ({
          productId: item.productId || item._id,
          title: item.title,
          description: item.description,
          quantity: item.quantity,
          imageUrls: item.imageUrls,
        })),
      });
      await findUser.save();

      let allOrderItemNames = orderedItems
        .map(
          (item: any) => `${item.quantity ? item.quantity : 1} ${item.title}` // as direct buying will not mention the item quantity.
        )
        .join(" and "); //very important****************************************************

      const message = `Your order is placed with the orderId- ${orderId} that includes ${allOrderItemNames}`;
      const subject = "Order Confirmation Mail";
      await allMails(userEmail, message, subject);

      return NextResponse.json(
        { message: "Order placed Successfully" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "error occured", error },
      { status: 500 }
    );
  }
}

interface TokenPayload extends JwtPayload {
  email: string;
  _id: string;
}

export async function GET(request: NextRequest) {
  await connectDB();

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

    if (data && data.email) {
      console.log(data.email);
      const foundUser = await User.findOne({ _id: data.id }); // You need to know in which way it's stored there in api.

      let orderItems = foundUser.placedOrders;

      return NextResponse.json(orderItems, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Invalid token data" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.log("error at get orderplacedApi", error);
    return NextResponse.json({ message: "error occured" }, { status: 500 });
  }
}

interface TokenPayload extends JwtPayload {
  email: string;
  _id: string;
}

export async function PATCH(request: NextRequest) {
  await connectDB();

  try {
    const { userId, orderId, productId } = await request.json();

    console.log(productId);
    console.log(orderId);
    console.log(userId);

    if (!userId || !orderId || !productId) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    // **Find and update User's placedOrders**
    const findUser = await User.findById(userId);

    // console.log(findUser);

    let id = productId.toString();
    const targetedProduct = await AddProducts.findOne({ productId: id });
    console.log("targetedProduct", targetedProduct);

    if (!findUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let updatedOrders = findUser.placedOrders;

    updatedOrders = updatedOrders.map((order: any) => {
      if (order.orderId === orderId) {
        order.placedItems = order.placedItems.filter(
          (item: any) => item.productId.toString() !== productId.toString()
        );
      }

      return order;
    });

    updatedOrders = updatedOrders.filter(
      (order: any) => order.placedItems.length > 0
    );

    console.log("updatedOrders", updatedOrders);

    await findUser.save();

    const userEmail = findUser.email;
    const message = `Your order  with the orderId- ${orderId} is cancelled. Payment will be refunded with 3-5 business days`;
    const subject = "Order Cancellation Mail";
    await allMails(userEmail, message, subject);

    // **Find and update Orders collection**
    const findOrder = await Orders.findOne({
      "orderList.orderId": orderId,
      "orderList.userId": userId,
    });

    if (findOrder) {
      findOrder.orderList = findOrder.orderList
        .map((order: any) => {
          if (order.orderId === orderId) {
            order.placedItems = order.placedItems.filter(
              (item: any) => item.productId.toString() !== productId.toString()
            );
          }
          return order;
        })
        .filter((order: any) => order.placedItems.length > 0); // Remove orders with no items.

      await findOrder.save();
    }

    return NextResponse.json(
      { message: "updatedOrders", updatedOrders },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error in DELETE placedItem API", error);
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
