import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { FalAIModel } from "@/lib/server/fal-ai";
import { GenerateImage } from "@/lib/types";

const falAiModel = new FalAIModel();

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

    // Generate image directly
    const { request_id } = await falAiModel.generateImage(
      parsedBody.data.prompt,
      parsedBody.data.modelId
    );

    return NextResponse.json({
      success: true,
      requestId: request_id,
      message: "Image generation started",
    });
  } catch (error) {
    console.error("Error in /api/ai/generate:", error);
    return NextResponse.json(
      {
        message: "Image generation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
