import axiosInstance from "@/utils/axios";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeId, jdId } = await req.json();
  if (!resumeId || !jdId) {
    return new Response("Missing resumeId or jdId", { status: 400 });
  }
  try {
    const response = await axiosInstance().post("/communication/call/produce", {
      type: "PHONE",
      payload: { resumeId, jdId },
    });
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    const apiError = error as ApiError;

    return new Response("Failed to initiate call: " + apiError.message, {
      status: 500,
    });
  }
}
