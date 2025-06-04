import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
        {
            message:"Logout successful",
            success:true,
        }
    );
    response.cookies.set("token", "",{httpOnly:true,expires: new Date(0)});
    return response;
  } catch (error: unknown) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
