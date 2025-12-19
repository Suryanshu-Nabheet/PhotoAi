import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";
import { db } from "@/lib/storage";
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

    // Adapt to provider params
    // Our current provider interface might need updating or we just pass a stringified config for now
    // For "End-to-end" w/ mock provider, we just queue the job.

    // We'll update the provider call to just pass the name and "images" (using zipUrl as a placeholder)
    // and maybe other params if we extend the backend interface.
    // For now, let's just make it compilable.

    const { requestId } = await getProvider().trainModel({
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      zipUrl: parsedBody.data.zipUrl,
    });

    // Save to local DB
    await db.persons.add({
      id: parsedBody.data.name.toLowerCase().replace(/\s+/g, "-"),
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      thumbnail: `https://placehold.co/600x600/png?text=${encodeURIComponent(
        parsedBody.data.name
      )}`,
      createdAt: Date.now(),
      modelId: requestId,
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
