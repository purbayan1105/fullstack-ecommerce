import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Log Out Successful" },
      { status: 200 }
    );

    response.cookies.set("userauthtoken", "", {
      expires: Date.now(),
    });

    return response;
  } catch (error: any) {
    console.log("error at logout api", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
