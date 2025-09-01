import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";

export async function POST(request: NextRequest) {
  try {
    // Read and forward the request body properly
    const requestBody = await request.text();

    const response = await axiosInstance.post("/search", requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json(
      error.response?.data || "Failed to fetch candidates",
      {
        status: error.response?.status || 500,
      }
    );
  }
}
