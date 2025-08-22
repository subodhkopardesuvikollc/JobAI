import { NextRequest, NextResponse } from "next/server";

const backendURL = process.env.API_BASE_URL;
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const resumeBlobName = searchParams.get("resumeBlobName");
  const jdBlobName = searchParams.get("jdBlobName");

  if (!resumeBlobName || !jdBlobName) {
    return new Response("Missing query parameters", { status: 400 });
  }

  const analysisResult = await fetch(
    `${backendURL}/resume/analyze?resumeBlobName=${resumeBlobName}&jdBlobName=${jdBlobName}`
  );

  if (!analysisResult.ok) {
    return new Response("Failed to fetch analysis result", { status: 500 });
  }

  const data = await analysisResult.json();

  return NextResponse.json(data);
}
