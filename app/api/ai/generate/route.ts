import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/ai";
import { GenerateImage } from "@/lib/types";
import { imageService, personService, userService } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Ensure user exists in our DB
    const user = await userService.findOrCreateUser(clerkId);

    const body = await request.json();
    const parsedBody = GenerateImage.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: "Invalid request body", error: parsedBody.error },
        { status: 400 },
      );
    }

    const { prompt, modelId } = parsedBody.data;

    if (!modelId) {
      return NextResponse.json(
        { message: "Model ID (Person) is required" },
        { status: 400 },
      );
    }

    // Fetch the person to get the correct valid FAL ID / LoRA URL
    const person = await personService.getPersonById(modelId);
    if (!person) {
      return NextResponse.json(
        { message: "Person model not found" },
        { status: 404 },
      );
    }

    // Determine the identifier to send to FAL
    // Priority: loraUrl (if ready) > falRequestId (if training success but url not saved yet)
    let falModelIdentifier = person.loraUrl || person.falRequestId;

    if (!falModelIdentifier) {
      return NextResponse.json(
        { message: "Person model is not ready for generation" },
        { status: 400 },
      );
    }

    // Use the provider abstraction
    const { requestId } = await getProvider().generateImage({
      prompt,
      modelId: falModelIdentifier,
      num: 1, // Default to 1
    });

    // Create a pending image record in the database
    await imageService.createImage({
      userId: user.id,
      personId: person.id,
      imageUrl: "", // will be updated when status is complete
      prompt: prompt,
      falRequestId: requestId,
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

    if (errorMessage.includes("balance") || errorMessage.includes("locked")) {
      return NextResponse.json(
        {
          message: "Generation failed due to billing",
          error: errorMessage,
        },
        { status: 402 },
      );
    }

    return NextResponse.json(
      {
        message: "Image generation failed",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
