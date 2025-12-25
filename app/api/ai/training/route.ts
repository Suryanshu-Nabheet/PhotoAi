import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";
import { personService, userService } from "@/lib/db";
import { z } from "zod";

const TrainModelSchema = z.object({
  name: z.string().min(1),
  type: z.string(),
  age: z.number(),
  ethnicity: z.string(),
  eyeColor: z.string(),
  bald: z.boolean(),
  zipUrl: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Find or create user
    const user = await userService.findOrCreateUser(clerkId);

    const body = await request.json();
    const parsedBody = TrainModelSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body", error: parsedBody.error },
        { status: 400 }
      );
    }

    // Start training with FAL AI
    const { requestId } = await getProvider().trainModel({
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethnicity: parsedBody.data.ethnicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      zipUrl: parsedBody.data.zipUrl,
    });

    console.log("Training started successfully:", requestId);

    // Save to database with Prisma
    const person = await personService.createPerson({
      userId: user.id,
      name: parsedBody.data.name,
      thumbnail: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        parsedBody.data.name
      )}&size=200&background=6366f1&color=fff`,
      falRequestId: requestId,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethnicity: parsedBody.data.ethnicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      triggerWord: parsedBody.data.name.toLowerCase().replace(/\s+/g, "_"),
    });

    console.log("Person saved to database:", person.id);

    return NextResponse.json({
      success: true,
      requestId: requestId,
      personId: person.id,
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
