// File: app/api/users/route.js
import { NextResponse } from "next/server"
import users from "../users.json"

export async function GET() {
  try {
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 })
  }
}
