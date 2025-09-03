import axiosInstance from "@/utils/axios";
import { NextResponse } from "next/server";

export async function GET() {
  const debugInfo = {
    message: "Debugging Environment Variables",
    apiBaseUrlExists: !!process.env.API_BASE_URL,
    apiKeyExists: !!process.env.API_KEY,
    apiKeyLength: process.env.API_KEY ? process.env.API_KEY.length : 0,
    axiosInstance: axiosInstance().defaults.headers,
  };
  return NextResponse.json(debugInfo);
}
