import { fetchResumeData } from "@/utils/helperFunctions";
import { FileWithUrl, PaginatedData, Resume } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useResume = (resumeFileName: string, enabled: boolean = true) => {
  return useQuery<Resume, Error>({
    queryKey: ["resume", resumeFileName],
    queryFn: async () => {
      const response = await fetch(`/api/resume/${resumeFileName}`);
      if (!response.ok) throw new Error("Network response was not ok");
      return (await response.json()) as Resume;
    },
    retry: 3,
    staleTime: 10 * 60 * 1000, //10 mins
    enabled: enabled && !!resumeFileName, // Only run when enabled AND resumeFileName exists
  });
};

export const useAllResumes = (pageNo: string, pageSize: string) => {
  if (pageNo.includes("-") || isNaN(Number(pageNo))) {
    pageNo = "0";
  }
  return useQuery<PaginatedData<FileWithUrl<Resume>>, Error>({
    queryKey: ["resumes", pageNo, pageSize],
    queryFn: () => fetchResumeData(pageNo, pageSize),
    retry: 3,
    staleTime: 10 * 60 * 1000, //10 mins
  });
};
