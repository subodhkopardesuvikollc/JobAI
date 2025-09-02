import axiosInstance from "@/utils/axios";
import { NextRequest, NextResponse } from "next/server";

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
  } catch (error: any) {
    throw new Error(error.response.data);
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
  } catch (error: any) {
    return NextResponse.json(error.response.data);
  }
}
