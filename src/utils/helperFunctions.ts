import { FileWithUrl, PaginatedData } from "./types";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const fetchResultsData = async (blobName: string) => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/jd/results`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blobName }),
      cache: "force-cache",
      next: { tags: ["jdResults"] },
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
  const data = await fetch(
    `${apiBaseUrl}/api/resume?${queryParams.toString()}`,
    {
      cache: "force-cache",
      next: { tags: ["resumes"] },
    }
  );
  if (!data.ok) {
    throw new Error("Failed to fetch resumes" + data);
  }
  const resumesData: PaginatedData<FileWithUrl> = await data.json();
  return resumesData;
};
