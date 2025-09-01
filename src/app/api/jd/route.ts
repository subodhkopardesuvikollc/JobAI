import { NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const response = await axiosInstance.post("/jd/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return new NextResponse(response.data, { status: 200 });
  } catch (error: any) {
    console.error("JD upload error:", error);

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

export async function GET() {
  try {
    const response = await axiosInstance.get("/jd");

    return NextResponse.json(response.data, {
      status: 200,
    });
  } catch (error: any) {
    console.error("JD fetch error:", error);
    return NextResponse.json(
      error.response?.data || "Failed to fetch job descriptions",
      { status: error.response?.status || 500 }
    );
  }
}
