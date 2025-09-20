"use client";
import useInterviewQuestions from "@/hooks/useInterview";
import { Candidates, Interview } from "@/utils/types";
import { CgSpinner } from "react-icons/cg";
import { GiCancel } from "react-icons/gi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiPhoneCall } from "react-icons/pi";
import Loader from "../Loader";
import { useJdContext } from "../providers/JdProvider";
import { useEffect, useRef, useState } from "react";
import Modal, { ModalRef } from "../ui/Modal";
import { formatFileName } from "@/utils/tableFunctions";
import InterviewQuestions from "./InterviewQuestions";
import { initiateCall } from "@/utils/helperFunctions";
import ScreeningHistory from "./ScreeningHistory";
import useScreeningHistory from "@/hooks/useScreeningHistory";

const Screening = ({ candidate }: { candidate: Candidates }) => {
  const {
    jd: { id: jdId, blobName: jdBlobName },
  } = useJdContext();
  const modalRef = useRef<ModalRef>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);

  const openModal = () => {
    modalRef.current?.showModal();
    // setIsModalOpen(true);
  };

  const closeModal = () => {
    modalRef.current?.close();
    // setIsModalOpen(false);
  };

  const activeClass =
    "border-b-2 border-blue-500 font-semibold text-blue-600 pb-1";

  const {
    data,
    isLoading,
    isError,
    refetch,
    saveInterviewMutate,
    saveInterviewError,
    saveInterviewPending,
  } = useInterviewQuestions(candidate.id, jdId);

  const [activeTab, setActiveTab] = useState<"screening" | "history">(
    data?.status === "COMPLETED" ? "history" : "screening"
  );
  const {
    data: screeningHistoryData,
    isLoading: isLoadingHistory,
    isError: isErrorHistory,
  } = useScreeningHistory(candidate.id, jdId, activeTab === "history");
  if (data?.status === "IN_PROGRESS" || data?.status === "QUEUED") {
    closeModal();
  }

  useEffect(() => {
    if (data?.questions) {
      setQuestions(data.questions);
    }
  }, [data, setQuestions]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div className="text-red-500">Error.</div>;
  }

  return (
    <div>
      <div onClick={openModal}>
        <ScreeningButton status={data?.status as Interview["status"]} />
      </div>

      <Modal
        title={`Screening for ${formatFileName(candidate.fileName)}`}
        ref={modalRef}
        onClose={closeModal}
        showCloseButton={true}
        actionButton={{
          label: saveInterviewPending ? "Saving questions..." : "Initiate Call",
          onClick: () => {
            saveInterviewMutate(questions);
            initiateCall(candidate.id, jdId).then(() => {});
          },
          variant: "primary",
          disabled: data?.status !== "NOT_STARTED" && data?.status !== "FAILED",
        }}
      >
        <div className="flex gap-4">
          <p
            className={
              activeTab === "screening" ? activeClass : "cursor-pointer"
            }
            onClick={() => setActiveTab("screening")}
          >
            Screening
          </p>
          <p
            className={activeTab === "history" ? activeClass : "cursor-pointer"}
            onClick={() => setActiveTab("history")}
          >
            Screening History
          </p>
        </div>

        <div>
          {activeTab === "screening" && (
            <InterviewQuestions
              jdBlobName={jdBlobName}
              resumeBlobName={candidate.fileName}
              refetchQuestions={refetch}
              questions={questions || []}
              setQuestions={setQuestions}
            />
          )}
          {activeTab === "history" && (
            <>
              {isErrorHistory && (
                <div className="text-red-500">Error loading history.</div>
              )}
              {isLoadingHistory ? (
                <Loader />
              ) : (
                screeningHistoryData && (
                  <ScreeningHistory history={screeningHistoryData} />
                )
              )}
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

const iconProps = { size: 20 };
const ScreeningButton = ({ status }: { status: Interview["status"] }) => {
  return (
    <>
      {status === "COMPLETED" && (
        <button className="p-2 px-3 py-2 w-full border-1 border-green-300 text-sm text-green-600 font-medium bg-green-100  rounded-full flex gap-1 items-center cursor-pointer">
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
          className="p-2 px-3 py-2 w-full text-sm text-gray-600 font-medium cursor-not-allowed bg-gray-100  rounded-full flex gap-1 items-center"
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
        <button className="p-2 px-3 py-2 w-full text-sm text-red-600 justify-around font-medium cursor-pointer bg-red-100 hover:bg-red-200  rounded-full flex  items-center transition-colors duration-300">
          <GiCancel className="text-red-500 cursor-pointer " />
          Retry
        </button>
      )}
    </>
  );
};

export default Screening;
