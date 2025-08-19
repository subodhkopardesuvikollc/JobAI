import { formatFileName } from "@/utils/tableFunctions";
import { File } from "@/utils/types";
import { JdProvider } from "../providers/JdProvider";
import CandidateData from "./CandidateData";

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
      <JdProvider value={currentJD.blobName}>
        <CandidateData blobName={currentJD.blobName} />
      </JdProvider>
    </div>
  );
};

export default JdDetails;
