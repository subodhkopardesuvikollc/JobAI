import { getQueryClient } from "@/components/providers/ReactQueryProvider";
import {
  fetchInterview as fetchInterview,
  saveInterview,
} from "@/utils/helperFunctions";
import { Interview } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const useInterviewQuestions = (resumeId: string, jdId: string) => {
  const queryClient = getQueryClient();
  const { data, isLoading, isError, refetch } = useQuery<Interview>({
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

  const {
    mutate: saveInterviewMutate,
    error: saveInterviewError,
    isPending: saveInterviewPending,
  } = useMutation({
    mutationFn: (questions: string[]) =>
      saveInterview(resumeId, jdId, questions),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["interview", resumeId, jdId] });

      const previousInterview = queryClient.getQueryData([
        "interview",
        resumeId,
        jdId,
      ]) as Interview | undefined;
      if (previousInterview) {
        queryClient.setQueryData(["interview", resumeId, jdId], {
          ...previousInterview,
          status: "QUEUED",
        });
      }
      return { previousInterview };
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["interview", resumeId, jdId],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["interview", resumeId, jdId],
      });
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
    saveInterviewMutate,
    saveInterviewError,
    saveInterviewPending,
  };
};

export default useInterviewQuestions;
