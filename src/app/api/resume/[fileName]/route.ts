import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
  // Access the fileName parameter
  const { fileName } = await params;

  const apiBaseUrl = process.env.API_BASE_URL;
  if (!apiBaseUrl) {
    return NextResponse.json("API base URL is not set", { status: 500 });
  }
  const response = await fetch(`${apiBaseUrl}/resume/${fileName}`);
  if (!response.ok) {
    return NextResponse.json("Failed to fetch resume", {
      status: response.status,
      statusText: response.statusText,
    });
  }
  const data = await response.json();
  return NextResponse.json(data, {
    status: 200,
    statusText: "OK",
  });
}
