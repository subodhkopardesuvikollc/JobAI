import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiBaseUrl = process.env.API_BASE_URL;

  if (!apiBaseUrl) {
    return new Response("API base URL not configured", { status: 500 });
  }

  const params = request.nextUrl.searchParams;

  const response = await fetch(
    `${apiBaseUrl}/email/generate-email?${params.toString()}`
  );

  if (!response.ok) {
    return new NextResponse("Failed to generate email", { status: 500 });
  }

  const data = await response.json();

  return new NextResponse(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
