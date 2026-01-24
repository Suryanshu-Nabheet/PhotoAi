import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";

import { imageService, personService } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ requestId: string }> },
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { requestId } = await params;
    const statusData = await getProvider().getStatus(requestId);

    // If completed, sync with DB
    if (statusData.status === "completed") {
      if (requestId.startsWith("train:")) {
        const loraUrl = statusData.result?.diffusers_lora_file?.url;
        if (loraUrl) {
          await personService.updatePersonByFalRequestId(requestId, {
            status: "ready",
            loraUrl: loraUrl,
          });
        }
      } else if (requestId.startsWith("gen:")) {
        // Result is array of images for gen
        const imageUrl = statusData.result?.[0]?.url;
        if (imageUrl) {
          await imageService.updateImageByFalRequestId(requestId, {
            status: "completed",
            imageUrl: imageUrl,
          });
        }
      }
    } else if (statusData.status === "failed") {
      if (requestId.startsWith("train:")) {
        await personService.updatePersonByFalRequestId(requestId, {
          status: "failed",
        });
      } else if (requestId.startsWith("gen:")) {
        await imageService.updateImageByFalRequestId(requestId, {
          status: "failed",
        });
      }
    }

    return NextResponse.json({
      success: true,
      status: statusData,
    });
  } catch (error) {
    console.error("Error in /api/ai/status:", error);
    return NextResponse.json(
      {
        message: "Failed to get status",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
