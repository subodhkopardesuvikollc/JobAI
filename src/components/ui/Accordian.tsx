import React, { ReactNode, useState } from "react";

interface props {
  title: ReactNode | string;
  description: string;
}
const Accordian = ({ title, description }: props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" border border-gray-300 p-5 rounded-xl ">
      <div className="flex justify-between items-center">
        <div>{title}</div>
        <p
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide" : "View"} Details
        </p>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        <div className="border-l-2 border-gray-400">
          <p className="ml-4 pb-2 text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Accordian;
