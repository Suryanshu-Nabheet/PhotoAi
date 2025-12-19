import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";
import { z } from "zod";

const GeneratePackSchema = z.object({
  packId: z.string(),
  modelId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsedBody = GeneratePackSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body", error: parsedBody.error },
        { status: 400 }
      );
    }

    // For now, treat pack generation as a single image generation or a batch
    // Since we don't have specific "pack" logic in provider yet, just generate 1 image
    // In future, this would queue multiple jobs or a specific "pack" job type

    const { requestId } = await getProvider().generateImage({
      prompt: `Generate pack ${parsedBody.data.packId}`, // Placeholder prompt logic
      modelId: parsedBody.data.modelId,
      num: 4, // Packs usually have multiple images
    });

    return NextResponse.json({
      success: true,
      requestId: requestId,
      message: "Pack generation queued",
    });
  } catch (error) {
    console.error("Error in /api/pack/generate:", error);
    return NextResponse.json(
      {
        message: "Pack generation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
