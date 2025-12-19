import { NextResponse } from "next/server";
import { db } from "@/lib/storage";

export async function GET() {
  try {
    const persons = await db.persons.getAll();
    return NextResponse.json(persons);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch persons" },
      { status: 500 }
    );
  }
}
