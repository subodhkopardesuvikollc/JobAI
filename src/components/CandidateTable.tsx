import { Candidates } from "@/app/page";
import { formatFileName } from "@/utils/tableFunctions";
import Link from "next/link";
import React from "react";

const CandidateTable = ({
  candidates,
}: {
  candidates: Candidates[] | null;
}) => {
  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Matching Candidates
      </h2>

      {!candidates && <p className="text-gray-600">No candidates found.</p>}
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
                    <Link
                      href={candidate.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                      View Resume
                    </Link>
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
