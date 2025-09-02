import axiosInstance from "@/utils/axios";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/utils/types";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const blobName = searchParams.get("blobName");

  if (!blobName) {
    throw new Error("Missing blobName");
  }

  try {
    const response = await axiosInstance.post(
      "/uploadToVectorDB",
      {},
      {
        params: { fileName: blobName },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const apiError = error as ApiError;
    throw new Error(apiError.response?.data || apiError.message);
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const blobName = searchParams.get("blobName");

  if (!blobName) {
    throw new Error("Missing blobName");
  }

  try {
    const response = await axiosInstance.get(`/resume/${blobName}`);

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    const apiError = error as ApiError;
    return NextResponse.json(apiError.response?.data || apiError.message, {
      status: apiError.response?.status || 500,
    });
  }
}
