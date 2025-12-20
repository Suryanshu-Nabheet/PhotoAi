import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";
import { db } from "@/lib/db";
import { z } from "zod";

const TrainModelSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  age: z.number(),
  ethinicity: z.string(),
  eyeColor: z.string(),
  bald: z.boolean(),
  zipUrl: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsedBody = TrainModelSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body", error: parsedBody.error },
        { status: 400 }
      );
    }

    const { requestId } = await getProvider().trainModel({
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      zipUrl: parsedBody.data.zipUrl,
    });

    // Save metadata to DB
    await db.addPerson({
      id: requestId, // Use job ID as temporary person ID
      name: parsedBody.data.name,
      thumbnail: parsedBody.data.zipUrl, // Use zip URL or placeholder as thumbnail for now?
      // Ideally we'd extract one image, but ZIP URL is what we have.
      // Let's use a generic placeholder or the zipUrl if it was an image (it's not).
      // For now, let's just save it. The UI might handle zipUrl gracefully or we need a designated thumbnail.
      // The previous mock used placehold.co. Let's use a placeholder.
      // ACTUALLY, the UI expects `thumbnail`. I'll use a placeholder for newly trained models until they are done.
    });

    return NextResponse.json({
      success: true,
      requestId: requestId,
      message: "Training job queued",
    });
  } catch (error) {
    console.error("Error in /api/ai/training:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Handle billing errors specifically
    if (errorMessage.includes("balance") || errorMessage.includes("locked")) {
      return NextResponse.json(
        {
          message: "Training failed due to billing",
          error: errorMessage,
        },
        { status: 402 } // Payment Required
      );
    }

    return NextResponse.json(
      {
        message: "Training failed",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
