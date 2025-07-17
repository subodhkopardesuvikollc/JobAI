import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const backendURL = process.env.API_BASE_URL;

  // Read and forward the request body properly
  const requestBody = await request.text();

  const data = await fetch(`${backendURL}/search`, {
    method: "POST",
    body: requestBody,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!data.ok) {
    return NextResponse.json("Failed to fetch candidates", {
      status: data.status,
      statusText: data.statusText,
    });
  }
  const candidatesData = await data.json();
  return NextResponse.json(candidatesData, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
