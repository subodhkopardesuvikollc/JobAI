import { getQueryClient } from "@/components/providers/ReactQueryProvider";
import { EmailDTO } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

const useSendEmail = (resumeFileName: string) => {
  const query = getQueryClient();
  return useMutation<string, Error, EmailDTO>({
    mutationFn: async (data: EmailDTO) => {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send email");
      }

      return await res.text();
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["resume", resumeFileName] });
    },
  });
};

export default useSendEmail;
