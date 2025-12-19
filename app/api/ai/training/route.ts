import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";
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

    return NextResponse.json({
      success: true,
      requestId: requestId,
      message: "Training job queued",
    });
  } catch (error) {
    console.error("Error in /api/ai/training:", error);
    return NextResponse.json(
      {
        message: "Training failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
