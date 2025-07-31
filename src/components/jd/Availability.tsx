"use client";
import React, { useRef, useState } from "react";
import Modal, { ModalRef } from "../ui/Modal";
import useResume from "@/hooks/useResume";
import Loader from "../Loader";
import { formatFileName } from "@/utils/tableFunctions";
import ComposeEmail from "./ComposeEmail";
import { useJdContext } from "../providers/JdProvider";

const Availability = ({ resumeFileName }: { resumeFileName: string }) => {
  const modalRef = useRef<ModalRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailComposeOpen, setIsEmailComposeOpen] = useState(false);
  const { jdFileName } = useJdContext();

  const openModal = () => {
    modalRef.current?.showModal();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    modalRef.current?.close();
    setIsModalOpen(false);
  };

  const { data, isLoading, error } = useResume(resumeFileName, isModalOpen);

  return (
    <>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        ref={modalRef}
        title={`Availability: ${formatFileName(resumeFileName)}`}
        actionButton={{
          label: "Compose Email",
          onClick: () => setIsEmailComposeOpen(!isEmailComposeOpen),
        }}
        onClose={closeModal}
      >
        <AvailabilityData data={data} isLoading={isLoading} error={error} />
        {isEmailComposeOpen && (
          <ComposeEmail
            data={{
              jdFileName,
              resumeFileName,
            }}
            onCancel={() => setIsEmailComposeOpen(!isEmailComposeOpen)}
            onSubmit={() => {}}
          />
        )}
      </Modal>
    </>
  );
};

const AvailabilityData = ({
  data,
  isLoading,
  error,
}: {
  data: any;
  isLoading: boolean;
  error: Error | null;
}) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="text-red-500 p-4 text-center">
          <p>Error loading resume data</p>
          <p className="text-sm">{error?.message}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <pre className="text-xs overflow-auto max-h-32">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Availability;
