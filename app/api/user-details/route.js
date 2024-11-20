// File: app/api/user-details/route.js
import { NextResponse } from "next/server"
import userDetails from "../user-details.json"

export async function GET() {
  try {
    return NextResponse.json(userDetails)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load user-details" },
      { status: 500 }
    )
  }
}
