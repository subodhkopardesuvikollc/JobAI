import { getQueryClient } from "@/components/providers/ReactQueryProvider";
import { Resume } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const startIndexing = async (blobName: string) => {
  const response = await fetch(`/api/resume/index?blobName=${blobName}`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  return response.json();
};

const checkIndexStatus = async (blobName: string) => {
  const response = await fetch(`/api/resume/index/?blobName=${blobName}`);

  if (!response.ok) {
    throw new Error("Failed to check indexing status");
  }

  const data: Resume = await response.json();

  return data;
};

const useIndex = (resumeBlobName: string, currentStatus: string) => {
  const queryClient = getQueryClient();

  const { data } = useQuery<Resume>({
    queryKey: ["resume", resumeBlobName],
    queryFn: () => checkIndexStatus(resumeBlobName),
    enabled: currentStatus !== "INDEXED",
    staleTime: 10 * 60 * 1000, //10 mins

    refetchInterval: (query) => {
      if (query.state.data?.indexStatus !== "INDEXING") {
        return false;
      }
      const attemptCount = query.state.dataUpdateCount || 0;
      const delay = Math.min(1000 * Math.pow(2, attemptCount), 32000);
      return delay;
    },
    refetchIntervalInBackground: true,
  });

  const indexMutation = useMutation({
    mutationFn: () => startIndexing(resumeBlobName),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["resume", resumeBlobName] });

      const previousResume =
        (queryClient.getQueryData(["resume", resumeBlobName]) as Resume) ||
        undefined;

      if (previousResume) {
        queryClient.setQueryData(["resume", resumeBlobName], {
          ...previousResume,
          indexStatus: "INDEXING",
        });
      }

      return { previousResume };
    },

    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["resume", resumeBlobName] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume", resumeBlobName] });
    },
  });

  return {
    startIndexing: indexMutation.mutate,
    isStarting: indexMutation.isPending,
    currentStatus: data?.indexStatus || currentStatus,
    resumeData: data,
    indexError: indexMutation.error,
  };
};

export default useIndex;
