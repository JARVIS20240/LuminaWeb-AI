import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields (name, email, subject, message) are required" },
        { status: 400 }
      );
    }

    const safeName = String(name);
    const safeEmail = String(email);
    const safeSubject = String(subject);
    const safeMessage = String(message);

    await connectToDatabase();

    const newContact = await Contact.create({
      name: safeName,
      email: safeEmail,
      subject: safeSubject,
      message: safeMessage,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
