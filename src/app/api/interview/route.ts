import axiosInstance from "@/utils/axios";
import { ApiError } from "next/dist/server/api-utils";
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
    const apiError = error as ApiError;

    return new Response("Error fetching interview data: " + apiError.message, {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.resumeId || !body.jdId || !body.questions) {
    return new Response("Missing body parameters", { status: 400 });
  }
  try {
    const response = await axiosInstance().post(`/interview`, body);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    const apiError = error as ApiError;

    return new Response("Error saving interview data: " + apiError.message, {
      status: 500,
    });
  }
}
