import { fetchResultsData } from "@/utils/helperFunctions";
import { JdResponseData } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const useResultsData = (blobName: string) => {
  return useQuery<JdResponseData, Error>({
    queryKey: ["resultsData", blobName],
    queryFn: () => fetchResultsData(blobName),
    retry: 3,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useResultsData;
