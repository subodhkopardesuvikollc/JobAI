import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";
import { ApiError } from "@/utils/types";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const resumeBlobName = searchParams.get("resumeBlobName");
  const jdBlobName = searchParams.get("jdBlobName");

  if (!resumeBlobName || !jdBlobName) {
    return new Response("Missing query parameters", { status: 400 });
  }

  try {
    const response = await axiosInstance.get(
      `/resume/analyze?resumeBlobName=${resumeBlobName}&jdBlobName=${jdBlobName}`
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    console.error("Resume analysis error:", error);
    const apiError = error as ApiError;
    return new Response(
      apiError.response?.data || "Failed to fetch analysis result",
      { status: apiError.response?.status || 500 }
    );
  }
}
