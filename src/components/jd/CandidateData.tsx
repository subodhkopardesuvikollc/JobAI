"use client";

import { useResultsData } from "@/hooks/useResultsData";
import Link from "next/link";
import ScreenLoader from "../ScreenLoader";
import CandidateTable from "./CandidateTable";

const CandidateData = ({ blobName }: { blobName: string }) => {
  const {
    data: candidateData,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useResultsData(blobName);

  if (isLoading) return <ScreenLoader message="Loading candidate data..." />;
  if (isFetching)
    return <ScreenLoader message="Refreshing candidate data..." />;

  if (error) return <div>Error loading candidate data</div>;

  return (
    <>
      <div className="flex mb-10 items-center justify-between bg-slate-50 p-4 rounded-md">
        <span className="font-medium text-slate-700">{blobName}</span>
        <Link
          href={candidateData?.jdUrl || "#"}
          className="bg-white text-slate-700 border border-slate-300 font-bold py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors text-sm"
        >
          {candidateData?.jdUrl ? "View JD" : "No URL"}
        </Link>
      </div>
      <CandidateTable
        candidates={candidateData?.resumeResults}
        refetch={refetch}
      />
    </>
  );
};

export default CandidateData;
