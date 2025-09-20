import axiosInstance from "@/utils/axios";
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
    return new Response("Failed to initiate call", { status: 500 });
  }
}
