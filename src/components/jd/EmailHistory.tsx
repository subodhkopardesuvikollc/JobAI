import { EmailDTO } from "@/utils/types";
import { HiOutlineMail } from "react-icons/hi";
import { TbMailExclamation } from "react-icons/tb";

const EmailHistory = ({
  emailHistory,
  currentEmail,
  handleViewEmail: setCurrentEmail,
}: {
  emailHistory: EmailDTO[];
  currentEmail: EmailDTO | null;
  handleViewEmail: (email: EmailDTO | null) => void;
}) => {
  if (!emailHistory || emailHistory.length === 0) {
    return (
      <div className=" text-slate-500 text-center">
        No history yet, compose an email to begin.
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-start">
      {emailHistory.map((data, index) => (
        <div key={index} className="flex gap-3">
          <div className="flex flex-col  items-center">
            <EmailIcon status={data.status} />
            {index < emailHistory.length - 1 && (
              <div className=" h-12 w-[2px] bg-blue-300"></div>
            )}
          </div>
          <div className="mt-[1px]">
            <p className="font-semibold text-slate-800">
              {data.status === "SENT" ? "Email Sent" : "Email Failed"}
            </p>
            <p className="text-xs text-slate-500">
              {data.createdAt.split("T")[0]}
            </p>
            <p
              onClick={() =>
                setCurrentEmail(
                  currentEmail?.createdAt === data.createdAt ? null : data
                )
              }
              className="text-sm cursor-pointer text-blue-600 hover:underline mt-1"
            >
              {data.createdAt === currentEmail?.createdAt
                ? "Hide Email"
                : "View Email"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const EmailIcon = ({ status }: { status: string }) => {
  return (
    <div>
      {status === "SENT" && (
        <div className="bg-blue-100 w-fit p-2 rounded-full">
          <HiOutlineMail className="text-blue-500" size={26} />
        </div>
      )}
      {status === "FAILED" && (
        <div className="bg-red-100 w-fit p-2 rounded-full">
          <TbMailExclamation className="text-red-500" size={26} />
        </div>
      )}
    </div>
  );
};

export default EmailHistory;
