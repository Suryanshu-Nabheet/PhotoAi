import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: user?.emailAddresses[0]?.emailAddress,
        name: user?.firstName || user?.username,
      },
    });
  } catch (error) {
    console.error("Error in /api/user/me:", error);
    return NextResponse.json(
      {
        message: "Failed to get user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
