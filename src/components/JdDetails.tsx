import { formatFileName } from "@/utils/tableFunctions";
import { File, JdResponseData } from "@/utils/types";
import Link from "next/link";
import { Suspense } from "react";
import CandidateTable from "./CandidateTable";
import ScreenLoader from "./ScreenLoader";
import { fetchResultsData } from "@/utils/helperFunctions";

const CandidateData = async ({ blobName }: { blobName: string }) => {
  const candidateData: JdResponseData | null = await fetchResultsData(blobName);

  if (!candidateData) return <div>Failed to load candidate data</div>;

  return (
    <>
      <div className="flex mb-10 items-center justify-between bg-slate-50 p-4 rounded-md">
        <span className="font-medium text-slate-700">{blobName}</span>
        <Link
          target="_blank"
          href={candidateData.jdUrl || "#"}
          className="bg-white text-slate-700 border border-slate-300 font-bold py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors text-sm"
        >
          {candidateData.jdUrl ? "View JD" : "No URL"}
        </Link>
      </div>
      <CandidateTable candidates={candidateData.resumeResults} />
    </>
  );
};

const JdDetails = ({ currentJD }: { currentJD: File | undefined }) => {
  if (!currentJD) {
    return (
      <div className="w-full bg-white p-6 rounded-xl shadow-md">
        <p>Select a job description to view details</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white h-[450px] p-6 rounded-xl overflow-y-auto shadow-md">
      <h2 className="text-3xl font-bold mb-4">
        {formatFileName(currentJD.fileName || "")}
      </h2>
      <Suspense fallback={<ScreenLoader message="Loading candidates..." />}>
        <CandidateData blobName={currentJD.blobName} />
      </Suspense>
    </div>
  );
};

export default JdDetails;
