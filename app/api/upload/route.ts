import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

// This route handles uploading a file to Fal.ai storage (or proxying it)
// Fal Storage Flow:
// 1. Initiate upload -> get upload_url
// 2. PUT file to upload_url
// 3. Return file_url

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

    const FAL_KEY = process.env.FAL_KEY;
    if (!FAL_KEY) throw new Error("Missing FAL_KEY");

    // 1. Initiate Upload
    // Using standard Fal REST pattern if available, or just mocking if Fal SDK is preferred
    // But since "remove all local llm", we assume we rely on Fal.
    // Fal Storage initiation endpoint for REST:
    // POST https://fal.run/storage/upload/initiate

    const initiateRes = await axios.post(
      "https://fal.run/storage/upload/initiate",
      {
        content_type: file.type || "application/zip",
        file_name: file.name,
      },
      {
        headers: {
          Authorization: `Key ${FAL_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { upload_url, file_url } = initiateRes.data;

    // 2. Upload File (PUT to upload_url)
    // We need to convert File to Buffer or Stream
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await axios.put(upload_url, buffer, {
      headers: {
        "Content-Type": file.type || "application/zip",
      },
    });

    return NextResponse.json({ url: file_url });
  } catch (error: any) {
    console.error("Upload error:", error.response?.data || error);
    return NextResponse.json(
      { message: "Upload failed", error: error.message },
      { status: 500 }
    );
  }
}
