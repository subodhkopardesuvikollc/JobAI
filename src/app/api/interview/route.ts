import axiosInstance from "@/utils/axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const resumeId = searchParams.get("resumeId");
  const jdId = searchParams.get("jdId");
  if (!resumeId || !jdId) {
    return new Response("Missing query parameters", { status: 400 });
  }
  try {
    const response = await axiosInstance().get(
      `/interview?resumeId=${resumeId}&jdId=${jdId}`
    );
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response("Error fetching interview data", { status: 500 });
  }
}
