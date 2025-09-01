import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileName: string }> }
) {
  try {
    // Access the fileName parameter
    const { fileName } = await params;

    const response = await axiosInstance.get(`/resume/${fileName}`);

    return NextResponse.json(response.data, {
      status: 200,
      statusText: "OK",
    });
  } catch (error: any) {
    console.error("Resume fetch error:", error);
    return NextResponse.json(error.response?.data || "Failed to fetch resume", {
      status: error.response?.status || 500,
    });
  }
}
