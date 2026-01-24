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
        { status: 400 },
      );
    }

    if (!process.env.FAL_KEY) {
      throw new Error("Missing FAL_KEY");
    }

    // Configure FAL client
    fal.config({
      credentials: process.env.FAL_KEY,
    });

    console.log("Uploading file to FAL storage:", {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    // Upload using the official client
    const url = await fal.storage.upload(file);

    console.log("Upload successful, file URL:", url);

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Upload error:", error);

    const message = error.message || "Upload failed";

    return NextResponse.json(
      { message: "Upload failed", error: message },
      { status: 500 },
    );
  }
}
