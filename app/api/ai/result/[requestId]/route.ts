import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";

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
    const status = await getProvider().getStatus(requestId);

    return NextResponse.json({
      success: true,
      result: status.result || null,
      status: status.status, // Also returning status might be helpful
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
