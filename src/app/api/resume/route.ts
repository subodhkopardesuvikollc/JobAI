import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";
import { ApiError } from "@/utils/types";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const response = await axiosInstance.post("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return new NextResponse(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error("Resume upload error:", error);
    const apiError = error as ApiError;

    if (apiError.response?.status === 413) {
      return new NextResponse(
        "File(s) too large. Please upload a smaller file.",
        { status: 413 }
      );
    }

    return new NextResponse(
      apiError.response?.data || "Failed to upload file: " + apiError.message,
      { status: apiError.response?.status || 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const response = await axiosInstance.get(
      `/resume?${searchParams.toString()}`
    );

    return NextResponse.json(response.data, {
      status: 200,
    });
  } catch (error: unknown) {
    console.error("Resume fetch error:", error);
    const apiError = error as ApiError;
    return NextResponse.json(
      apiError.response?.data || "Failed to fetch resumes",
      { status: apiError.response?.status || 500 }
    );
  }
}
