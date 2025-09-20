import axiosInstance from "@/utils/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const resumeId = searchParams.get("resumeId");
  const jdId = searchParams.get("jdId");
  if (!resumeId || !jdId) {
    return NextResponse.json(
      { error: "Missing resumeId or jdId" },
      { status: 400 }
    );
  }
  try {
    const response = await axiosInstance().get("/interview/communications", {
      params: { resumeId, jdId },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching interview communications:", error);
    return NextResponse.json(
      { error: "Failed to fetch interview communications" },
      { status: 500 }
    );
  }
}
