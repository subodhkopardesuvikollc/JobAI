import React, { ChangeEvent, useState } from "react";
import Loader from "../Loader";

interface FileUploadProps {
  files: File[];
  setFiles: (files: File[]) => void;
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
}
const FileUpload = ({
  files,
  setFiles,
  isLoading,
  isSuccess,
}: FileUploadProps) => {
  const [error, setError] = useState("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length == 0) return;

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit.");
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setFiles([...files, ...validFiles]);
      setError("");
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleClearAll = () => {
    setFiles([]);
  };

  return (
    <div>
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-slate-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <p className="mt-2 text-sm text-slate-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            <span>Upload a file</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              multiple
              onChange={handleFileChange}
              accept=".pdf, .doc, .docx, .txt"
            />
          </label>
        </p>
        <p className="text-xs text-slate-500">PDF, DOC, DOCX, TXT up to 10MB</p>
      </div>

      {files.length > 0 && (
        <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 mt-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-slate-700">
              Selected Files ({files.length})
            </h3>
            <button
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-slate-700 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Remove file"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="mt-4 flex justify-center">
          <Loader message="Uploading files..." />
        </div>
      )}

      {isSuccess && (
        <div className="mt-4 flex justify-center text-green-600 text-sm font-medium">
          File(s) uploaded successfully!
        </div>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;
