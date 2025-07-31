"use client";
import React, { useRef, useState } from "react";
import Modal, { ModalRef } from "../ui/Modal";
import useResume from "@/hooks/useResume";
import Loader from "../Loader";

const Availability = ({ resumeFileName }: { resumeFileName: string }) => {
  const modalRef = useRef<ModalRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    modalRef.current?.showModal();
    setIsModalOpen(true); // Enable the query
  };

  const closeModal = () => {
    modalRef.current?.close();
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        ref={modalRef}
        title="Availability: Bob Williams"
        actionButton={{
          label: "Compose Follow-up",
          onClick: () => {
            // Handle action
            closeModal();
          },
        }}
        onClose={closeModal}
      >
        <AvailabilityData
          resumeFileName={resumeFileName}
          enabled={isModalOpen}
        />
      </Modal>
    </>
  );
};

const AvailabilityData = ({
  resumeFileName,
  enabled,
}: {
  resumeFileName: string;
  enabled: boolean;
}) => {
  const { data, isLoading, error } = useResume(resumeFileName, enabled);

  if (data) {
    console.log("Resume data", data);
  }
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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600">📧</span>
            </div>
            <div>
              <p className="font-medium">Email Sent</p>
              <p className="text-sm text-gray-500">2025-07-23</p>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p>Hi there, are you available to chat?</p>
          </div>
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
