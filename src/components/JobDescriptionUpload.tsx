"use client";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import TextUpload from "./TextUpload";
import { useRouter } from "next/navigation";

const JobDescriptionUpload = () => {
  const [textJd, setTextJd] = useState({ title: "", description: "" });

  const [activeTab, setActiveTab] = useState("text");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const {
    isLoading,
    error: uploadError,
    uploadFiles,
    uploadText,
    setSuccess,
    setError: setUploadError,
    success,
  } = useFileUpload();

  useEffect(() => {
    setError("");
    setUploadError("");
    setSuccess(false);
  }, [activeTab, files, textJd]);

  const router = useRouter();
  const handleFileUpload = async () => {
    if (activeTab === "text") {
      if (!textJd.description.trim() || !textJd.title.trim()) {
        setError("Please fill in both job title and description.");
        return;
      }
      await uploadText(textJd.description, textJd.title + ".txt");
    } else if (activeTab === "file") {
      if (files.length === 0) {
        setError("Please upload at least one file.");
        return;
      }
      await uploadFiles(files);
    }
    router.refresh();
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
              <ul className="flex space-x-6">
                <li>
                  <button
                    id="tab-text"
                    className={`${
                      activeTab === "text" ? "text-blue-400" : "text-slate-500"
                    } py-2 px-1 text-sm font-medium border-b-2 border-transparent hover:cursor-pointer`}
                    onClick={() => setActiveTab("text")}
                  >
                    Paste Text
                  </button>
                </li>
                <li>
                  <button
                    id="tab-pdf"
                    className={`${
                      activeTab === "file" ? "text-blue-400" : "text-slate-500"
                    } py-2 px-1 text-sm font-medium border-b-2 border-transparent hover:cursor-pointer`}
                    onClick={() => setActiveTab("file")}
                  >
                    Upload File
                  </button>
                </li>
              </ul>
            </div>

            {activeTab === "text" && (
              <TextUpload
                setError={setError}
                textJd={textJd}
                setTextJd={setTextJd}
                isLoading={isLoading}
                error={error}
                success={success}
              />
            )}

            {activeTab === "file" && (
              <FileUpload
                files={files}
                setFiles={setFiles}
                isLoading={isLoading}
                isSuccess={success}
                error={uploadError}
              />
            )}

            {uploadError && (
              <div className="mt-4 text-red-600 text-sm font-medium">
                {uploadError}
              </div>
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

export default JobDescriptionUpload;
