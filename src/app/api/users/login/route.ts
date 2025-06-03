import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to DB
connect();

export async function POST(request: NextRequest) {
  try {
    console.log("Login endpoint hit");

    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("Received body:", reqBody);

    if (!email || !password) {
        console.warn("⚠️ [LOGIN] Missing email or password");
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    console.log()

    // Check if user exists
    const user = await User.findOne({ email });
    console.warn(`❌ [LOGIN] No user found with email: ${email}`);
    if (!user) {
      console.log("User not found:", email);
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Compare password
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword){
      console.log("Invalid password");
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    // Set token in cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
    });
    return response;
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Login error:", error.message);
    } else {
      console.error("Login error:", error);
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
