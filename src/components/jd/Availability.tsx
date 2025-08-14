"use client";
import useResume from "@/hooks/useResume";
import useSendEmail from "@/hooks/useSendEmail";
import { formatFileName, htmlToPlainText } from "@/utils/tableFunctions";
import { EmailDTO } from "@/utils/types";
import { useRef, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import Loader from "../Loader";
import { useJdContext } from "../providers/JdProvider";
import Modal, { ModalRef } from "../ui/Modal";
import ComposeEmail from "./ComposeEmail";
import EmailHistory from "./EmailHistory";

const Availability = ({ resumeFileName }: { resumeFileName: string }) => {
  const modalRef = useRef<ModalRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailComposeOpen, setIsEmailComposeOpen] = useState(false);
  const { jdFileName } = useJdContext();
  const [currentEmail, setCurrentEmail] = useState<EmailDTO | null>(null);

  const openModal = () => {
    modalRef.current?.showModal();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    modalRef.current?.close();
    setIsModalOpen(false);
  };

  const { data, isLoading, error, refetch } = useResume(
    resumeFileName,
    isModalOpen
  );
  const { mutate, isPending, error: sendError } = useSendEmail(resumeFileName);

  const handleSendEmail = (data: EmailDTO) => {
    mutate(data, {
      onSuccess: () => {
        setIsEmailComposeOpen(false);
        setCurrentEmail(data);
      },
    });
  };
  const checkClass = "bg-blue-100 text-blue-700 hover:bg-blue-200";
  const sent = "bg-orange-100 text-orange-700 hover:bg-orange-200";

  return (
    <>
      <button
        onClick={openModal}
        className={`text-[12.5px] cursor-pointer font-bold py-1 px-3 rounded-full tracking-[0.8px] transition-colors ${
          data?.reachOutEmails?.length ? sent : checkClass
        }`}
      >
        {data
          ? data.reachOutEmails?.length
            ? "Sent"
            : "Check"
          : "Click to Check"}
      </button>

      <Modal
        ref={modalRef}
        title={`Availability: ${formatFileName(resumeFileName)}`}
        actionButton={
          !isEmailComposeOpen
            ? {
                label: "Compose Email",
                onClick: () => {
                  if (!isEmailComposeOpen)
                    setIsEmailComposeOpen(!isEmailComposeOpen);
                  setCurrentEmail(null);
                },
              }
            : undefined
        }
        onClose={closeModal}
      >
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="text-red-500 p-4 text-center">
            <p>Error loading resume data</p>
            <p className="text-sm">{error?.message}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex w-fit ml-auto p-1 mb-4 active:rotate-360 transition-all duration-500 rounded-full hover:bg-slate-100">
              <button
                onClick={() => refetch()}
                className="text-gray-500 hover:text-blue-500 cursor-pointer transition-colors"
              >
                <IoMdRefresh size={20} />
              </button>
            </div>
            <EmailHistory
              emailHistory={data?.reachOutEmails || []}
              currentEmail={currentEmail}
              handleViewEmail={setCurrentEmail}
            />
            {currentEmail && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md max-h-[200px] overflow-y-auto">
                <p className="text-sm mb-3 text-slate-700 whitespace-pre-wrap">
                  {currentEmail.subject}
                </p>
                <p className="text-sm text-slate-700 whitespace-pre-wrap">
                  {htmlToPlainText(currentEmail.body)}
                </p>
              </div>
            )}
          </div>
        )}{" "}
        {isEmailComposeOpen && (
          <ComposeEmail
            isSending={isPending}
            sendError={sendError?.message}
            data={{
              jdFileName,
              resumeFileName,
            }}
            onCancel={() => setIsEmailComposeOpen(!isEmailComposeOpen)}
            onSubmit={handleSendEmail}
          />
        )}
      </Modal>
    </>
  );
};

export default Availability;
