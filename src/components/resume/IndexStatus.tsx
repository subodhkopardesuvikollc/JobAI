"use client";
import useIndex from "@/hooks/useIndex";
import { CgSpinner } from "react-icons/cg";
import { HiDocumentSearch } from "react-icons/hi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";

const IndexStatus = ({
  resumeBlobName,
  initialStatus,
}: {
  resumeBlobName: string;
  initialStatus: "NOT_INDEXED" | "INDEXING" | "INDEXED" | "FAILED";
}) => {
  const iconProps = { size: 25 };
  const { startIndexing, isStarting, currentStatus, resumeData, indexError } =
    useIndex(resumeBlobName, initialStatus);

  const status = currentStatus || initialStatus;
  console.log("current resume", resumeData);

  const handleIndexingClick = () => {
    if (status === "NOT_INDEXED" || status === "FAILED") {
      startIndexing();
    }
  };

  return (
    <div
      title={status?.toLowerCase()}
      className="flex items-center justify-center"
    >
      {status === "INDEXED" && (
        <p className="text-green-500 cursor-pointer">
          <IoCheckmarkCircle {...iconProps} />
        </p>
      )}

      {status === "NOT_INDEXED" && (
        <button
          onClick={handleIndexingClick}
          disabled={isStarting}
          title="click to start indexing"
          className="text-gray-400 cursor-pointer active:scale-96 hover:text-blue-500 transition-colors duration-200 ease-in-out"
        >
          <HiDocumentSearch {...iconProps} />
        </button>
      )}
      {status === "FAILED" && (
        <button
          onClick={handleIndexingClick}
          disabled={isStarting}
          title={`${indexError} click to retry indexing`}
          className="text-red-500 cursor-pointer active:scale-96"
        >
          <MdOutlineError {...iconProps} />
        </button>
      )}
      {status === "INDEXING" && (
        <p className="text-blue-500 cursor-pointer animate-spin">
          <CgSpinner {...iconProps} />
        </p>
      )}
    </div>
  );
};

export default IndexStatus;
