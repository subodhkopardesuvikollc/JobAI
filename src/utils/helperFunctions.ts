import { FileWithUrl, PaginatedData } from "./types";

export const fetchResultsData = async (blobName: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jd/results`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blobName }),
        cache: "force-cache",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching candidate data:", error);
  }
};

export const fetchResumeData = async (pageNo: string, pageSize: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const queryParams = new URLSearchParams();
  queryParams.append("pageNo", pageNo.toString());
  queryParams.append("pageSize", pageSize.toString());
  const data = await fetch(`${baseUrl}/api/resume?${queryParams.toString()}`, {
    cache: "force-cache",
    next: { tags: ["resumes"] },
  });
  if (!data.ok) {
    throw new Error("Failed to fetch resumes" + data);
  }
  const resumesData: PaginatedData<FileWithUrl> = await data.json();
  return resumesData;
};
