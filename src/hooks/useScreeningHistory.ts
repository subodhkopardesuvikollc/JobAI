import { fetchScreeningHistory } from "@/utils/helperFunctions";
import { CallContent, Communication } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const useScreeningHistory = (
  resumeId: string,
  jdId: string,
  enable: boolean
) => {
  return useQuery<Communication<CallContent>[]>({
    queryKey: ["screeningHistory", resumeId, jdId],
    queryFn: () => fetchScreeningHistory(resumeId, jdId),
    enabled: enable && !!resumeId && !!jdId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });
};

export default useScreeningHistory;
