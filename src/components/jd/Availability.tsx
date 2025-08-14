"use client";
import React, { useRef, useState } from "react";
import Modal, { ModalRef } from "../ui/Modal";
import useResume from "@/hooks/useResume";
import Loader from "../Loader";
import { formatFileName, htmlToPlainText } from "@/utils/tableFunctions";
import ComposeEmail from "./ComposeEmail";
import { useJdContext } from "../providers/JdProvider";
import EmailHistory from "./EmailHistory";
import { EmailDTO } from "@/utils/types";
import useSendEmail from "@/hooks/useSendEmail";

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

  const { data, isLoading, error } = useResume(resumeFileName, isModalOpen);
  const { mutate, isPending, error: sendError } = useSendEmail(resumeFileName);

  const handleSendEmail = (data: EmailDTO) => {
    console.log("submitting", data);
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
