import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { fal } from "@fal-ai/client";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }

    if (!process.env.FAL_KEY) {
      throw new Error("Missing FAL_KEY");
    }

    // Configure fal with server-side credentials
    console.log("FAL_KEY Status:", {
      exists: !!process.env.FAL_KEY,
      length: process.env.FAL_KEY?.length,
      prefix: process.env.FAL_KEY?.substring(0, 4),
    });

    fal.config({
      credentials: process.env.FAL_KEY,
    });

    const url = await fal.storage.upload(file);

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Upload error:", error);
    const status = error.status || 500;
    return NextResponse.json(
      { message: "Upload failed", error: error.message || error },
      { status }
    );
  }
}
