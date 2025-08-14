import { COMMUNICATION_TYPES } from "@/utils/communicationConstants";
import { communicationDTO, EmailDTO } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

const apiBaseUrl = process.env.API_BASE_URL;
export async function GET(request: NextRequest) {
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

export async function POST(request: Request) {
  if (!apiBaseUrl) {
    return new Response("API base URL not configured", { status: 500 });
  }
  const emailData: EmailDTO = await request.json();
  const communicationData: communicationDTO<EmailDTO> = {
    type: COMMUNICATION_TYPES.EMAIL,
    payload: emailData,
  };

  const response = await fetch(`${apiBaseUrl}/communication/produce`, {
    method: "POST",
    body: JSON.stringify(communicationData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return new NextResponse("Failed to send email", { status: 500 });
  }
  const data = await response.text();
  return new NextResponse(data, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
