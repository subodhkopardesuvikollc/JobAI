import { fetchResultsData, fetchResumeAnalysis } from "@/utils/helperFunctions";
import { JdResponseData, resumeAnalysis } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useResultsData = (blobName: string) => {
  return useQuery<JdResponseData, Error>({
    queryKey: ["resultsData", blobName],
    queryFn: () => fetchResultsData(blobName),
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useResumeAnalysis = (
  resumeBlobName: string,
  jdBlobName: string,
  enable: boolean
) => {
  return useQuery<resumeAnalysis, Error>({
    queryKey: ["resumeAnalysis", resumeBlobName, jdBlobName],
    queryFn: () => fetchResumeAnalysis(resumeBlobName, jdBlobName),
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: enable,
  });
};
