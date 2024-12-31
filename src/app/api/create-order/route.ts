import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID as any,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

console.log("Server RAZORPAY Key ID:", process.env.RAZOR_PAY_KEY_ID);
console.log("Server RAZORPAY Key Secret:", process.env.RAZOR_PAY_KEY_SECRET);

export async function POST(request: NextRequest) {
  try {
    const { amount, currency } = await request.json();

    let options = {
      amount: amount * 100,
      currency: currency,
      receipt: "rcp1",
    };
    const order = await razorpay.orders.create(options);
    console.log(order.id);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error: any) {
    console.log("error at creatting order", error);
  }
  return NextResponse.json({ data: "error at payment api" }, { status: 501 });
}
