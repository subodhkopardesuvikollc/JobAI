"use client";
import useInterviewQuestions from "@/hooks/useInterview";
import { Interview } from "@/utils/types";
import { CgSpinner } from "react-icons/cg";
import { GiCancel } from "react-icons/gi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiPhoneCall } from "react-icons/pi";
import Loader from "../Loader";
import { useJdContext } from "../providers/JdProvider";

const Screening = ({ resumeId }: { resumeId: string }) => {
  const {
    jd: { id: jdId },
  } = useJdContext();

  const { data, isLoading, isError, refetch } = useInterviewQuestions(
    resumeId,
    jdId
  );
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div className="text-red-500">Error.</div>;
  }
  return (
    <div>
      <ScreeningButton status={data?.status as Interview["status"]} />
    </div>
  );
};

const ScreeningButton = ({ status }: { status: Interview["status"] }) => {
  const iconProps = { size: 20 };
  return (
    <>
      {status === "COMPLETED" && (
        <button className=" border-1 border-green-300 w-full justify-center px-3 py-2 text-sm font-medium cursor-pointer hover:bg-green-100 rounded-full flex gap-2 transition-colors duration-300">
          <IoDocumentTextOutline {...iconProps} />
          Completed
        </button>
      )}
      {status === "NOT_STARTED" && (
        <button className=" border-1 border-gray-300 w-full justify-center px-3 py-2 text-sm font-medium cursor-pointer hover:bg-gray-100 rounded-full flex gap-2 transition-colors duration-300">
          <PiPhoneCall {...iconProps} /> Start
        </button>
      )}
      {status === "IN_PROGRESS" && (
        <button
          className="p-2 px-3 py-2 w-full text-sm text-blue-600 font-medium cursor-not-allowed bg-blue-100  rounded-full flex gap-1 items-center"
          disabled
        >
          <CgSpinner
            {...iconProps}
            className="text-blue-500 cursor-pointer animate-spin"
          />
          In Progress
        </button>
      )}
      {status === "QUEUED" && (
        <button
          className="p-2 px-3 py-2 w-full text-sm text-gray-600 font-medium cursor-pointer bg-gray-100  rounded-full flex gap-1 items-center"
          disabled
        >
          <CgSpinner
            {...iconProps}
            className="text-gray-500 cursor-pointer animate-spin"
          />
          Queued
        </button>
      )}
      {status === "FAILED" && (
        <button
          className="p-2 px-3 py-2 w-full text-sm text-red-600 justify-around font-medium cursor-pointer bg-red-100 hover:bg-red-200  rounded-full flex  items-center transition-colors duration-300"
          disabled
        >
          <GiCancel className="text-red-500 cursor-pointer " />
          Retry
        </button>
      )}
    </>
  );
};

export default Screening;
