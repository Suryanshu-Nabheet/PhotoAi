import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";
import { GenerateImage } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsedBody = GenerateImage.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body", error: parsedBody.error },
        { status: 400 }
      );
    }

    // Use the provider abstraction
    const { requestId } = await getProvider().generateImage({
      prompt: parsedBody.data.prompt,
      modelId: parsedBody.data.modelId,
      num: 1, // Default to 1 for now
    });

    return NextResponse.json({
      success: true,
      requestId: requestId,
      message: "Image generation queued",
    });
  } catch (error) {
    console.error("Error in /api/ai/generate:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Handle billing errors specifically
    if (errorMessage.includes("balance") || errorMessage.includes("locked")) {
      return NextResponse.json(
        {
          message: "Generation failed due to billing",
          error: errorMessage,
        },
        { status: 402 } // Payment Required
      );
    }

    return NextResponse.json(
      {
        message: "Image generation failed",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
