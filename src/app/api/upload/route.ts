import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const backedURL = process.env.API_BASE_URL;

  if (!backedURL) {
    return new NextResponse("API base URL is not set", { status: 500 });
  }
  try {
    const response = await fetch(`${backedURL}/jd/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new NextResponse("Failed to upload file: " + errorText, {
        status: 500,
        statusText: response.statusText,
      });
    }

    const textResponse = await response.text();

    return new NextResponse("Successfully uploaded file", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to upload file: " + error, {
      status: 500,
    });
  }
}
