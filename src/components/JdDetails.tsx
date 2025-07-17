import { formatFileName } from "@/utils/tableFunctions";
import Link from "next/link";
import CandidateTable from "./CandidateTable";
import { JobDescription } from "@/utils/types";
import { Suspense } from "react";

const JdDetails = async ({
  jdData,
  jdId,
}: {
  jdId: string | undefined;
  jdData: JobDescription[];
}) => {
  const selectedJob = jdData.find((jd) => jd.id === jdId);

  if (!selectedJob) {
    return (
      <div className="w-full bg-white p-6 rounded-xl shadow-md">
        <p>Select a job description to view details</p>
      </div>
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/jd/results`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blobName: selectedJob.fileName }),
      cache: "force-cache",
    }
  );

  const candidateData = await response.json();
  return (
    <div className="w-full bg-white h-[450px] p-6 rounded-xl overflow-y-auto shadow-md">
      <Suspense fallback={<div>Loading candidates...</div>}>
        <h2 className="text-3xl font-bold mb-4">
          {formatFileName(selectedJob?.fileName || "")}
        </h2>
        <div className="flex mb-10 items-center justify-between bg-slate-50 p-4 rounded-md">
          <span className="font-medium text-slate-700">
            {selectedJob?.blobName}
          </span>
          <Link
            target="_blank"
            href={candidateData.jdUrl}
            className="bg-white text-slate-700 border border-slate-300 font-bold py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors text-sm"
          >
            View JD
          </Link>
        </div>
        <CandidateTable candidates={candidateData.resumeResults} />
      </Suspense>
    </div>
  );
};

export default JdDetails;
