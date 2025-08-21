import { formatFileScore } from "@/utils/tableFunctions";
import { useRef, useState } from "react";
import Accordian from "../ui/Accordian";
import Badge from "../ui/Badge";
import Meter from "../ui/Meter";
import Modal, { ModalRef } from "../ui/Modal";

interface props {
  score: string;
  name: string;
}

const mockData = {
  overallMatchScore: 45,
  summary:
    "The candidate has a strong background in Java development and cloud technologies, with notable experience in Python for data processing. However, the lack of specific AI/ML skills and libraries mentioned in the job description significantly lowers the overall match score, indicating a limited fit for the AI/ML Engineer role.",
  skillAssessments: [
    {
      skill: "Langchain",
      score: 10,
      reason:
        "The resume does not mention any experience or knowledge related to Langchain.",
    },
    {
      skill: "Multiple Agent",
      score: 10,
      reason:
        "The resume lacks any reference to working with multiple agent systems.",
    },
    {
      skill: "Strong Python",
      score: 70,
      reason:
        "The candidate demonstrates Python proficiency through ETL solutions and data transformations using Python.",
    },
    {
      skill: "Lang Graph",
      score: 10,
      reason: "No mention of experience with Lang Graph in the resume.",
    },
    {
      skill: "NoSQL database",
      score: 80,
      reason:
        "The candidate has extensive experience with NoSQL databases like MongoDB and Cassandra.",
    },
    {
      skill: "Isolation Forest",
      score: 10,
      reason:
        "The resume does not indicate any experience with Isolation Forest.",
    },
    {
      skill: "LOF",
      score: 10,
      reason: "There is no mention of experience with LOF in the resume.",
    },
    {
      skill: "Ensemble model working experience",
      score: 10,
      reason:
        "The resume does not provide evidence of experience with ensemble models.",
    },
  ],
};

const Analysis = ({ score, name }: props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    modalRef.current?.showModal();
    setIsModalOpen(true);
  };

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
        title={`Analysis for ${name}`}
      >
        <Meter
          size={150}
          title={"Overall Match Score"}
          value={mockData.overallMatchScore}
        />

        <div className="p-4 mt-10 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg mb-6">
          <p className="font-[600]">Summary:</p>
          <p className="mt-2">{mockData.summary}</p>
        </div>

        <div className="flex flex-col gap-5">
          {mockData.skillAssessments.map((skill, index) => (
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
      </Modal>
    </div>
  );
};

export default Analysis;
