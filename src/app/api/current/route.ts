import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get("userauthtoken")?.value;

  if (!authToken) {
    return NextResponse.json({ message: "Token Not Found" }, { status: 501 });
  }
  try {
    const data = jwt.verify(authToken, process.env.JWT_KEY as string);
    console.log(data);
    return NextResponse.json({ data: data }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
