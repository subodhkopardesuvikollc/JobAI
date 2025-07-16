"use client";

import React, { useState } from "react";
import Loader from "./Loader";

interface TextUploadProps {
  textJd: { title: string; description: string };
  setTextJd: (textJd: { title: string; description: string }) => void;
  isLoading: boolean;
  success: boolean;
  error: string;
  setError: (error: string) => void;
}

const TextUpload = ({
  textJd,
  setTextJd,
  isLoading,
  success,
  error,
  setError,
}: TextUploadProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="job-title"
          className="text-sm font-medium text-gray-700"
        >
          Job Title
        </label>
        <input
          type="text"
          placeholder="Job Title"
          className={`w-full p-2 border rounded-lg shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          value={textJd.title}
          onChange={(e) => setTextJd({ ...textJd, title: e.target.value })}
        />
      </div>
      <div>
        <label
          htmlFor="job-description"
          className="text-sm font-medium text-gray-700"
        >
          Job Description
        </label>
        <textarea
          id="job-description"
          name="job-description"
          rows={12}
          className={`w-full p-4 border rounded-lg shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={error || "Paste the full job description here..."}
          value={textJd.description}
          onChange={(e) => {
            setTextJd({ ...textJd, description: e.target.value });
            if (error) setError("");
          }}
        />
      </div>
      {isLoading && (
        <div className="mt-4 flex justify-center">
          <Loader message="Uploading job description..." />
        </div>
      )}

      {success && (
        <div className="mt-4 flex justify-center text-green-600 text-sm font-medium">
          File(s) uploaded successfully!
        </div>
      )}
    </div>
  );
};

export default TextUpload;
