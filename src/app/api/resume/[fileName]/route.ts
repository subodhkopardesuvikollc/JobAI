import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";
import { ApiError } from "@/utils/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
  try {
    // Access the fileName parameter
    const { fileName } = await params;

    const response = await axiosInstance().get(`/resume/${fileName}`);

    return NextResponse.json(response.data, {
      status: 200,
      statusText: "OK",
    });
  } catch (error: unknown) {
    console.error("Resume fetch error:", error);
    const apiError = error as ApiError;
    return NextResponse.json(
      apiError.response?.data || "Failed to fetch resume",
      {
        status: apiError.response?.status || 500,
      }
    );
  }
}
