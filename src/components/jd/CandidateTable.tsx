import { formatFileName } from "@/utils/tableFunctions";
import { Candidates } from "@/utils/types";
import Link from "next/link";
import RefreshButton from "../ui/RefreshButton";
import Analysis from "./Analysis";
import Availability from "./Availability";
import Screening from "./Screening";

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
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Availability
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Screening
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {candidates.map((candidate, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className="w-fit  text-center"
                      style={candidate.fileUrl ? {} : { pointerEvents: "none" }}
                    >
                      <Link href={candidate.fileUrl || ""}>
                        {
                          <p className="text-sm font-medium hover:underline">
                            {formatFileName(candidate.fileName)}
                          </p>
                        }
                      </Link>
                    </div>
                    <div className="text-sm font-medium text-gray-900"></div>
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
                    <Screening candidate={candidate} />
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
