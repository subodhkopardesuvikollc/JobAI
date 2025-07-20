import { formatFileName } from "@/utils/tableFunctions";
import { Candidates } from "@/utils/types";
import Link from "next/link";
import React from "react";

const CandidateTable = ({
  candidates,
}: {
  candidates: Candidates[] | null;
}) => {
  if (!candidates || candidates.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No candidates found for this job description.
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-2xl font-bold  text-gray-900 mb-4">
        Matching Candidates
      </h2>

      {(!candidates || candidates.length === 0) && (
        <p className="text-gray-600">No candidates found.</p>
      )}
      {candidates && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Candidate
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Resume
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatFileName(candidate.fileName)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className="w-fit  text-center"
                      style={candidate.fileUrl ? {} : { pointerEvents: "none" }}
                    >
                      <Link href={candidate.fileUrl || ""} target="_blank ">
                        {candidate.fileUrl ? (
                          <p className="text-blue-500 px-2 py-[1px] rounded-2xl hover:bg-blue-200 bg-blue-100  transition-colors">
                            View Resume
                          </p>
                        ) : (
                          <p className="text-red-400 px-2 py-[1px] rounded-2xl bg-red-100 cursor-not-allowed transition-colors">
                            Not Available
                          </p>
                        )}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-normal">
                    <p className="text-sm text-gray-600">{candidate.score}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CandidateTable;
