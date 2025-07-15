"use client";
import { Candidates } from "@/app/page";
import { useState } from "react";
import CandidateTable from "./CandidateTable";
import FileUpload from "./FileUpload";
import { useFileUpload } from "@/hooks/useFileUpload";

interface props {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  candidates: Candidates[] | undefined;
  setCandidates: (value: Candidates[] | undefined) => void;
  showResults: boolean;
  setShowResults: (value: boolean) => void;
  error: string;
  setError: (value: string) => void;
}

const JobDescriptions = () => {
  const [textJd, setTextJd] = useState({ title: "", description: "" });

  const [activeTab, setActiveTab] = useState("text");
  const [files, setFiles] = useState<File[]>([]);

  const { isLoading, error, setError, uploadFiles, uploadText, success } =
    useFileUpload();

  const handleFileUpload = async () => {
    if (activeTab === "text") {
      if (!textJd.description.trim() || !textJd.title.trim()) {
        setError("Please fill in both job title and description.");
        return;
      }
      await uploadText(textJd.description, textJd.title);
    } else if (activeTab === "file") {
      if (files.length === 0) {
        setError("Please upload at least one file.");
        return;
      }
      await uploadFiles(files);
    }
  };
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Candidate Matcher
        </h1>
        <p className="text-md text-gray-600 mt-2">
          Paste a job description below to find relevant candidates.
        </p>
      </header>

      <main>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="block text-lg font-semibold text-gray-700 mb-2">
              Add a New Job Description
            </h2>
            <div className="border-b border-slate-200 mb-4">
              <nav className="flex space-x-6">
                <button
                  id="tab-text"
                  className={`${
                    activeTab === "text" ? "text-blue-400" : "text-slate-500"
                  } py-2 px-1 text-sm font-medium border-b-2 border-transparent hover:cursor-pointer`}
                  onClick={() => setActiveTab("text")}
                >
                  Paste Text
                </button>
                <button
                  id="tab-pdf"
                  className={`${
                    activeTab === "file" ? "text-blue-400" : "text-slate-500"
                  } py-2 px-1 text-sm font-medium border-b-2 border-transparent hover:cursor-pointer`}
                  onClick={() => setActiveTab("file")}
                >
                  Upload File
                </button>
              </nav>
            </div>

            {activeTab === "text" && (
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
                    onChange={(e) =>
                      setTextJd({ ...textJd, title: e.target.value })
                    }
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
                    placeholder={
                      error || "Paste the full job description here..."
                    }
                    value={textJd.description}
                    onChange={(e) => {
                      setTextJd({ ...textJd, description: e.target.value });
                      if (error) setError("");
                    }}
                  />
                </div>
                {isLoading && (
                  <div className="flex items-center justify-center mt-4">
                    <svg
                      className="animate-spin h-5 w-5 text-blue-600 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span className="text-blue-600 text-sm font-medium">
                      Uploading...
                    </span>
                  </div>
                )}

                {success && (
                  <div className="mt-4 flex justify-center text-green-600 text-sm font-medium">
                    File(s) uploaded successfully!
                  </div>
                )}
              </div>
            )}

            {activeTab === "file" && (
              <FileUpload
                files={files}
                setFiles={setFiles}
                isLoading={isLoading}
                isSuccess={success}
                error={error}
              />
            )}
            <button
              onClick={handleFileUpload}
              className="mt-4 w-full sm:w-auto  items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isLoading ? "Loading..." : "Submit Job Description"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDescriptions;
