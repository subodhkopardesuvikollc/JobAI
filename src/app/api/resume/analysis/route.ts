import { NextRequest, NextResponse } from "next/server";
import axiosInstance from "@/utils/axios";

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
  } catch (error: any) {
    console.error("Resume analysis error:", error);
    return new Response(
      error.response?.data || "Failed to fetch analysis result",
      { status: error.response?.status || 500 }
    );
  }
}
