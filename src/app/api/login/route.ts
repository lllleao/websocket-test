import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const userData = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const messageTo = await prisma.user.findFirst({
      where: {
        email: {
          not: email,
        },
      },
    });

    if (userData) {
      return NextResponse.json({ success: true, to: messageTo?.email, email: userData.email});
    }
    return NextResponse.json({ success: false }, { status: 401 });
  } catch (err) {
    console.log(err);
  }
}
