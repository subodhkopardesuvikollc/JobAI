import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const response = await axiosInstance.post("/resume/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return new NextResponse(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Resume upload error:", error);

    if (error.response?.status === 413) {
      return new NextResponse(
        "File(s) too large. Please upload a smaller file.",
        { status: 413 }
      );
    }

    return new NextResponse(
      error.response?.data || "Failed to upload file: " + error.message,
      { status: error.response?.status || 500 }
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
  } catch (error: any) {
    console.error("Resume fetch error:", error);
    return NextResponse.json(
      error.response?.data || "Failed to fetch resumes",
      { status: error.response?.status || 500 }
    );
  }
}
