import { fetchInterview as fetchInterview } from "@/utils/helperFunctions";
import { Interview } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const useInterviewQuestions = (resumeId: string, jdId: string) => {
  return useQuery<Interview>({
    queryKey: ["interview", resumeId, jdId],
    queryFn: () => {
      return fetchInterview(resumeId, jdId);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!resumeId && !!jdId,
    retry: 3,
    refetchInterval: (query) => {
      if (
        query.state.data?.status !== "IN_PROGRESS" &&
        query.state.data?.status !== "QUEUED"
      ) {
        return false;
      }
      const attemptCount = query.state.dataUpdateCount || 0;
      const delay = Math.min(1000 * Math.pow(2, attemptCount), 32000);
      return delay;
    },
    refetchIntervalInBackground: true,
  });
};

export default useInterviewQuestions;
