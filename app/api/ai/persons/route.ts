import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { personService, userService } from "@/lib/db";

export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Find or create user
    const user = await userService.findOrCreateUser(clerkId);

    // Get only user's own trained persons (no demo data)
    const userPersons = await personService.getPersonsByUserId(user.id);

    // Transform to match frontend expectations
    const transformedPersons = userPersons.map((person) => ({
      id: person.falRequestId || person.id,
      name: person.name,
      thumbnail: person.thumbnail,
      status: person.status,
    }));

    console.log(
      `Fetched ${transformedPersons.length} persons for user ${user.id}`
    );

    return NextResponse.json({ persons: transformedPersons });
  } catch (error) {
    console.error("Error fetching persons:", error);
    return NextResponse.json(
      { error: "Failed to fetch persons" },
      { status: 500 }
    );
  }
}
