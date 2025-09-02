import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";
import { ApiError } from "@/utils/types";

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
  } catch (error: unknown) {
    console.error("Search error:", error);
    const apiError = error as ApiError;
    return NextResponse.json(
      apiError.response?.data || "Failed to fetch candidates",
      {
        status: apiError.response?.status || 500,
      }
    );
  }
}
