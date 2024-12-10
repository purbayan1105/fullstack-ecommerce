import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const adminAuthToken = request.cookies.get("adminauthToken")?.value;

  try {
    if (!adminAuthToken) {
      throw new Error("Token not found");
    } else {
      const response = NextResponse.json(
        { message: "Logout Succesful" },
        { status: 200 }
      );

      response.cookies.set(
        "adminauthToken",
        "",

        {
          httpOnly: true,
          secure: true,
          expires: new Date(0),
        }
      );
      return response;
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 501 });
  }
}
