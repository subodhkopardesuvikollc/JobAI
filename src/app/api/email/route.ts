import { COMMUNICATION_TYPES } from "@/utils/communicationConstants";
import { communicationDTO, EmailDTO, ApiError } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const response = await axiosInstance().get(
      `/email/generate-email?${params.toString()}`
    );

    return new NextResponse(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Email generation error:", error);
    const apiError = error as ApiError;
    return new NextResponse(
      apiError.response?.data || "Failed to generate email",
      { status: apiError.response?.status || 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const emailData: EmailDTO = await request.json();
    const communicationData: communicationDTO<EmailDTO> = {
      type: COMMUNICATION_TYPES.EMAIL,
      payload: emailData,
    };

    const response = await axiosInstance().post(
      "/communication/produce",
      communicationData
    );

    return new NextResponse(response.data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Email sending error:", error);
    const apiError = error as ApiError;
    return new NextResponse(apiError.response?.data || "Failed to send email", {
      status: apiError.response?.status || 500,
    });
  }
}
