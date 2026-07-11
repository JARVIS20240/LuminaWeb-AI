import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const safeEmail = String(email);

    await connectToDatabase();

    const newSubscriber = new Subscriber({ email: safeEmail });
    await newSubscriber.save();

    return NextResponse.json(
      { message: "Successfully subscribed!" },
      { status: 201 }
    );
  } catch (error: any) {
    // MongoDB duplicate key error code is 11000
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 400 }
      );
    }
    
    console.error("Subscription Error:", error);
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
