import { formatFileName, formatFileScore } from "@/utils/tableFunctions";
import { Candidates } from "@/utils/types";
import Link from "next/link";
import React from "react";
import Availability from "./Availability";
import RefreshButton from "../ui/RefreshButton";
import Analysis from "./Analysis";

const CandidateTable = ({
  candidates,
  refetch,
}: {
  candidates: Candidates[] | undefined;
  refetch: () => void;
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold  text-gray-900 mb-4">
          Matching Candidates
        </h2>
        <RefreshButton onRefresh={refetch} />
      </div>

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
                  Score
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Availability
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
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
                  <td className="px-6 py-4 whitespace-normal">
                    <Analysis
                      resumeFileName={candidate.fileName}
                      score={candidate.score}
                    />
                  </td>

                  <td className="px-6 py-4 whitespace-normal">
                    <Availability resumeFileName={candidate.fileName} />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className="w-fit  text-center"
                      style={candidate.fileUrl ? {} : { pointerEvents: "none" }}
                    >
                      <Link href={candidate.fileUrl || ""} target="_blank ">
                        {candidate.fileUrl ? (
                          <p className="bg-blue-100 text-blue-700 font-bold py-1 px-3 rounded-full hover:bg-blue-200 text-sm transition-colors">
                            View Resume
                          </p>
                        ) : (
                          <p className="bg-red-100 text-blue-400 font-bold py-1 px-3 rounded-full hover:bg-red-200 text-sm transition-colors">
                            Not Available
                          </p>
                        )}
                      </Link>
                    </div>
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
