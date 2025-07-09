"use client";
import CandidateTable from "@/components/CandidateTable";
import React, { useState, useRef } from "react";

// Mock Data: In a real application, this would likely come from an API call

// Main App Component
// based on the job description submitted.
export type Candidates = {
  fileName: string;
  fileUrl: string;
  score: string;
};
export default function Home() {
  // --- State Management ---
  // Stores the text from the job description textarea.
  const [jobDescription, setJobDescription] = useState("");
  // Stores the list of candidates to display.
  const [candidates, setCandidates] = useState<Candidates[]>();
  // Controls the visibility of the results section.
  const [showResults, setShowResults] = useState(true);
  // Manages the validation error state for the textarea.
  const [error, setError] = useState("");

  // --- Refs ---
  // A ref to the results section to enable smooth scrolling.
  const resultsRef = useRef<HTMLDivElement>(null);

  // --- Event Handlers ---
  const handleFindCandidates = async () => {
    // 1. Validate Input
    if (jobDescription.trim() === "") {
      setError("Please paste a job description first!");
      return; // Stop execution if textarea is empty
    }

    const response = await fetch("http://localhost:8080/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: jobDescription }),
    });

    if (!response.ok) {
      setError("Failed to fetch candidates. Please try again later.");
      return; // Stop execution if the request fails
    }
    const data = await response.json();

    if (data) {
      setCandidates(data);
      setShowResults(true);
    } else {
      setError("No candidates found for the given job description.");
      setShowResults(false);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
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
            {/* Job Description Input Section */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <label
                htmlFor="job-description"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Job Description
              </label>
              <textarea
                id="job-description"
                name="job-description"
                rows={12}
                className={`w-full p-4 border rounded-lg shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={error || "Paste the full job description here..."}
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  if (error) setError(""); // Clear error on typing
                }}
              />
              <button
                onClick={handleFindCandidates}
                className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Find Candidates
              </button>
            </div>

            {/* Candidate Results Section - Conditionally Rendered */}
            {showResults && <CandidateTable candidates={candidates || null} />}
          </div>
        </main>
      </div>
    </div>
  );
}
