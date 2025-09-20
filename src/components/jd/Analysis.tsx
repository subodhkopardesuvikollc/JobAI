import { formatFileName, formatFileScore } from "@/utils/tableFunctions";
import { useRef, useState } from "react";
import Accordian from "../ui/Accordian";
import Badge from "../ui/Badge";
import Meter from "../ui/Meter";
import Modal, { ModalRef } from "../ui/Modal";
import { useResumeAnalysis } from "@/hooks/useResultsData";
import { useJdContext } from "../providers/JdProvider";
import Loader from "../Loader";

interface props {
  score: string;
  resumeFileName: string;
}

const Analysis = ({ score, resumeFileName: blobName }: props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    modalRef.current?.showModal();
    setIsModalOpen(true);
  };

  const {
    jd: { blobName: jdFileName },
  } = useJdContext();

  const { data, isLoading, error } = useResumeAnalysis(
    blobName,
    jdFileName,
    isModalOpen
  );

  const formattedScore = formatFileScore(score);
  const modalRef = useRef<ModalRef>(null);

  return (
    <div>
      <p
        onClick={openModal}
        className="cursor-pointer font-semibold text-blue-600 hover:underline"
      >
        {formattedScore}%
      </p>

      <Modal
        ref={modalRef}
        showCloseButton={true}
        title={`Analysis for ${formatFileName(blobName)}`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {" "}
            <Meter
              size={150}
              title={"Overall Match Score"}
              value={data?.overallMatchScore || 0}
            />
            <div className="p-4 mt-10 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg mb-6">
              <p className="font-[600]">Summary:</p>
              <p className="mt-2">{data?.summary}</p>
            </div>
            {error && (
              <p className=" text-center text-red-500">{error.message}</p>
            )}
            <div className="flex flex-col gap-5">
              {data?.skillAssessments.map((skill, index) => (
                <Accordian
                  key={index}
                  title={
                    <div className="flex gap-5 items-center">
                      <Badge value={skill.score} />
                      <p className="truncate w-30 md:w-full font-medium text-[18px]">
                        {skill.skill}
                      </p>
                    </div>
                  }
                  description={skill.reason}
                />
              ))}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Analysis;
