"use client";
import { useFileUpload } from "@/hooks/useFileUpload";
import React, { useEffect } from "react";
import FileUpload from "./FileUpload";

const ResumeUpload = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState("");

  const {
    isLoading,
    error: uploadError,
    uploadFiles,
    setSuccess,
    setError: setUploadError,
    success,
  } = useFileUpload("resume");

  useEffect(() => {
    setError("");
    setUploadError("");
    setSuccess(false);
  }, [files, setSuccess, setUploadError]);

  const handleFileUpload = async () => {
    if (files.length === 0) {
      setError("Please upload at least one file.");
      return;
    }
    await uploadFiles(files);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Upload New Resumes</h2>
      <FileUpload
        files={files}
        setFiles={setFiles}
        isLoading={isLoading}
        isSuccess={success}
        error={uploadError}
      />
      {error && (
        <div className="mt-4 text-red-600 text-sm font-medium">{error}</div>
      )}
      <button
        onClick={handleFileUpload}
        className="mt-4 w-full sm:w-auto  items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        {isLoading ? "Loading..." : "Submit Resume"}
      </button>
    </div>
  );
};

export default ResumeUpload;
