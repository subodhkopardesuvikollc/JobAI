import axiosInstance from "@/utils/axios";
import { NextResponse } from "next/server";

export async function GET() {
  const allEnvVars = process.env;
  const debugInfo: {
    message: string;
    apiBaseUrlExists: boolean;
    apiKeyExists: boolean;
    apiKeyLength: number;
    [key: string]: unknown;
  } = {
    message: "Debugging Environment Variables",
    apiBaseUrlExists: !!process.env.API_BASE_URL,
    apiKeyExists: !!process.env.API_KEY,
    apiKeyLength: process.env.API_KEY ? process.env.API_KEY.length : 0,
    axiosInstance: axiosInstance().defaults.headers,
  };
  Object.keys(allEnvVars).forEach((key) => {
    debugInfo[key] = !!allEnvVars[key];
  });
  return NextResponse.json(debugInfo);
}
