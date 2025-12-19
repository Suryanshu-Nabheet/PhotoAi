import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { FalAIModel } from "@/lib/server/fal-ai";

const falAiModel = new FalAIModel();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ requestId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { requestId } = await params;
    const result = await falAiModel.getResult(requestId);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error in /api/ai/result:", error);
    return NextResponse.json(
      {
        message: "Failed to get result",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
