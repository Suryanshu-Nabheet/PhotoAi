import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

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

    console.log("Uploading file to FAL storage:", {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Step 1: Initiate upload to get upload URL
    const initiateResponse = await axios.post(
      "https://rest.alpha.fal.ai/storage/upload/initiate",
      {
        file_name: file.name,
        content_type: file.type || "application/zip",
      },
      {
        headers: {
          Authorization: `Key ${process.env.FAL_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Initiate response:", initiateResponse.data);

    const { upload_url, file_url } = initiateResponse.data;

    // Step 2: Upload file to the provided URL
    await axios.put(upload_url, buffer, {
      headers: {
        "Content-Type": file.type || "application/zip",
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    console.log("Upload successful, file URL:", file_url);

    return NextResponse.json({ url: file_url });
  } catch (error: any) {
    console.error("Upload error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    });

    const status = error.response?.status || 500;
    const message =
      error.response?.data?.detail || error.message || "Upload failed";

    return NextResponse.json(
      { message: "Upload failed", error: message },
      { status }
    );
  }
}
