import { NextRequest, NextResponse } from "next/server";

const backendURL = process.env.API_BASE_URL;

export async function POST(request: Request) {
  const formData = await request.formData();

  if (!backendURL) {
    return new NextResponse("API base URL is not set", { status: 500 });
  }
  try {
    const response = await fetch(`${backendURL}/resume/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      if (response.status === 413) {
        return new NextResponse(
          "File(s) too large. Please upload a smaller file.",
          {
            status: 413,
          }
        );
      }
      const errorText = await response.text();

      return new NextResponse("Failed to upload file: " + errorText, {
        status: response.status,
        statusText: response.statusText,
      });
    }

    const textResponse = await response.text();

    return new NextResponse(textResponse, { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to upload file: " + error, {
      status: 500,
    });
  }
}
export async function GET(request: NextRequest) {
  if (!backendURL) {
    return NextResponse.json("API base URL is not set", { status: 500 });
  }
  const searchParams = request.nextUrl.searchParams;

  const response = await fetch(
    `${backendURL}/resume?${searchParams.toString()}`
  );
  if (!response.ok) {
    return NextResponse.json("Failed to fetch resumes", {
      status: response.status,
      statusText: response.statusText,
    });
  }
  const data = await response.json();
  return NextResponse.json(data, {
    status: 200,
  });
}
