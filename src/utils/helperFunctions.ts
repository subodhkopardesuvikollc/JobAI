import { FileWithUrl, JdResponseData, PaginatedData } from "./types";

export const fetchResultsData = async (blobName: string) => {
  // try {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jd/results`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ blobName }),
  //       cache: "force-cache",
  //     }
  //   );
  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error("Error fetching candidate data:", error);
  // }
  return {
    jdUrl: "",
    resumeResults: [
      {
        fileName: "Jani Syed Resume(Java Full Stack) (1).docx",
        fileUrl:
          "https://jobresume.blob.core.windows.net/resumes/Jani%20Syed%20Resume%28Java%20Full%20Stack%29%20%281%29.docx?sv=2025-05-05&se=2025-08-01T03%3A30%3A51Z&sr=b&sp=r&sig=fThhvF6FyR40NqoNyOKAuhWg17Wlxr8d9y1uklt3qu8%3D&rscd=inline",
        score: "0.85526824",
      },
      {
        fileName: "Dheeraj_Krishna_Resume.pdf",
        fileUrl:
          "https://jobresume.blob.core.windows.net/resumes/Dheeraj_Krishna_Resume.pdf?sv=2025-05-05&se=2025-08-01T03%3A30%3A51Z&sr=b&sp=r&sig=KLtCGb5stb1G3VjxyTTJCIB%2Bm3hK8W526dRCVMTjclo%3D&rscd=inline",
        score: "0.84172416",
      },
    ],
  } as JdResponseData;
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
