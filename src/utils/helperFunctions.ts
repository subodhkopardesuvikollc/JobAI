import axiosInstance from "./axios";
import { FileWithUrl, PaginatedData, Resume } from "./types";

export const fetchResultsData = async (blobName: string) => {
  try {
    const response = await fetch(`/api/jd/results`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blobName }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching candidate data:", error);
  }
};

export const fetchResumeData = async (pageNo: string, pageSize: string) => {
  const queryParams = new URLSearchParams();
  queryParams.append("pageNo", pageNo.toString());
  queryParams.append("pageSize", pageSize.toString());
  console.log(axiosInstance().request.toString());

  const data = await fetch(`/api/resume?${queryParams.toString()}`);
  if (!data.ok) {
    throw new Error("Failed to fetch resumes" + data);
  }
  const resumesData: PaginatedData<FileWithUrl<Resume>> = await data.json();
  return resumesData;
};

export const fetchResumeAnalysis = async (
  resumeBlobName: string,
  jdBlobName: string
) => {
  const response = await fetch(
    `/api/resume/analysis?resumeBlobName=${resumeBlobName}&jdBlobName=${jdBlobName}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch resume analysis, please try again later.`);
  }
  const data = await response.json();
  return data;
};
