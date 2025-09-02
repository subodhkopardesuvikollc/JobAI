import { NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";
import { ApiError } from "@/utils/types";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const response = await axiosInstance.post("/jd/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return new NextResponse(response.data, { status: 200 });
  } catch (error: unknown) {
    console.error("JD upload error:", error);
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

export async function GET() {
  try {
    const response = await axiosInstance.get("/jd");

    return NextResponse.json(response.data, {
      status: 200,
    });
  } catch (error: unknown) {
    console.error("JD fetch error:", error);
    const apiError = error as ApiError;
    return NextResponse.json(
      apiError.response?.data || "Failed to fetch job descriptions",
      { status: apiError.response?.status || 500 }
    );
  }
}
