import { fetchResumeAnalysis } from "@/utils/helperFunctions";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaRegQuestionCircle } from "react-icons/fa";

const InterviewQuestions = ({
  refetchQuestions,
  questions,
  resumeBlobName,
  jdBlobName,
  setQuestions,
}: {
  refetchQuestions: () => void;
  questions: string[];
  resumeBlobName: string;
  jdBlobName: string;
  setQuestions: (questions: string[]) => void;
}) => {
  const [loading, setLoading] = useState(false);
  if (questions.length === 0) {
    return (
      <div className="flex justify-center flex-col items-center mt-10 gap-5">
        <FaRegQuestionCircle size={50} color="gray" />
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xl font-medium text-black">
            No Questions Found
          </span>
          <p>Generate questions based on the JD to begin screening.</p>
        </div>{" "}
        <button
          onClick={() => {
            if (questions.length !== 0) return;
            setLoading(true);
            fetchResumeAnalysis(resumeBlobName, jdBlobName).then(() => {
              refetchQuestions();
              setLoading(false);
            });
          }}
          className={`mt-4 px-4 py-2 bg-blue-600 font-medium rounded-lg text-white hover:bg-blue-700 transition-colors cursor-pointer ${
            questions.length !== 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <CgSpinner
                size={20}
                className="text-white cursor-pointer animate-spin"
              />
              Generating...
            </div>
          ) : (
            "Generate Questions"
          )}
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 mt-4">
      {questions.map((question, index) => (
        <div key={index}>
          <div className="flex items-center w-full gap-2">
            <label className="font-semibold"> {index + 1}.</label>
            <textarea
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index] = e.target.value;
                setQuestions(updatedQuestions);
              }}
              className="w-full p-1 pl-3 border-1 border-gray-400 rounded-lg"
              defaultValue={question}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InterviewQuestions;
