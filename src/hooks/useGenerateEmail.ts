import { EmailDTO } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

const useGenerateEmail = (
  resumeFileName: string,
  jobTitle: string,
  jdBlobName: string,
  enable?: boolean
) => {
  return useQuery({
    queryKey: ["email", resumeFileName, jdBlobName],
    queryFn: async () => {
      const res = await fetch(
        `/api/email?resumeBlobName=${resumeFileName}&jobTitle=${jobTitle}&jdBlobName=${jdBlobName}`
      );
      if (!res.ok) {
        throw new Error("Failed to generate email");
      }
      const data: EmailDTO = await res.json();
      return data;
    },
    staleTime: Infinity,
    retry: 1,
    enabled: enable,
  });
};

export default useGenerateEmail;
