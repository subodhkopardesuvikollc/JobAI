import { CallContent, Communication } from "@/utils/types";
import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbReport } from "react-icons/tb";

const ScreeningHistory = ({
  history,
}: {
  history: Communication<CallContent>[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (history.length === 0) {
    return (
      <p className="text-gray-500 text-center font-medium mt-10">
        No screening history found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-[30%_1fr] gap-4 mt-5">
      <div className="border-r border-gray-300 pr-2 max-h-[500px] overflow-y-auto flex flex-col gap-1">
        {history.map((call, idx) => {
          const date = new Date(call.timestamp).toLocaleString().split(",")[0];
          const time = new Date(call.timestamp).toLocaleString().split(",")[1];
          return (
            <div
              className={`p-2  cursor-pointer transition-colors duration-100 ${
                activeIndex === idx
                  ? "bg-blue-100 rounded"
                  : "hover:bg-gray-100"
              }`}
              key={idx}
              onClick={() => setActiveIndex(idx)}
            >
              <p>{date}</p>
              <p className="text-sm text-gray-500">{time}</p>
            </div>
          );
        })}
      </div>

      <div className="p-2 max-h-[500px] overflow-y-auto">
        {screeningContent(history[activeIndex].content)}
      </div>
    </div>
  );
};

const screeningContent = (content: CallContent) => {
  return (
    <>
      <div className="flex gap-2  items-center mb-3">
        <button
          title="View Transcript"
          className="border cursor-pointer flex gap-1 px-2 items-center border-blue-300  p-1 rounded-lg text-blue-700 bg-blue-100 text-sm font-medium"
        >
          <IoDocumentTextOutline size={18} /> View Transcript
        </button>
        <button
          title="Report generation is coming soon"
          className="border cursor-not-allowed flex gap-1 px-2 items-center border-gray-300  p-1 rounded-lg text-gray-700 bg-gray-100 text-sm font-medium"
        >
          {" "}
          <TbReport size={20} />
          View Report
        </button>
      </div>
      <div className="bg-gray-50 p-5 rounded flex flex-col gap-3">
        {content.utterances.map((u, idx) => {
          const isModel = u.speaker === "model";
          const bgColor = isModel ? "bg-gray-300" : "bg-blue-200";
          const speakerHeader = isModel ? "Interviewer" : "Candidate";
          const headerColor = isModel ? "text-gray-700" : "text-blue-700";

          return (
            <div key={idx}>
              <p className={`${headerColor} font-medium text-sm`}>
                {speakerHeader}
              </p>
              <div key={idx} className={`p-3  rounded-lg w-fit ${bgColor}`}>
                <p className=" text-wrap">{u.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ScreeningHistory;
