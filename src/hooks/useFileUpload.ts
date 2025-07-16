import { POST } from "@/app/api/jd/route";
import { useState } from "react";

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const uploadFiles = async (files: File[]) => {
    setIsLoading(true);
    setError("");

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/jd", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          setError("Failed to upload file: " + errorText);
          throw new Error(errorText);
        }

        return await response.text();
      });

      const results = await Promise.all(uploadPromises);
      if (results.length > 0) {
        setSuccess(true);
        setError("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadText = async (text: string, filename: string) => {
    setIsLoading(true);
    setError("");

    try {
      const textFile = new File([text], filename, { type: "text/plain" });
      await uploadFiles([textFile]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    }
  };

  return {
    isLoading,
    error,
    success,
    uploadFiles,
    uploadText,
  };
};
