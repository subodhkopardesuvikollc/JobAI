"use client";
import useGenerateEmail from "@/hooks/useGenerateEmail";
import {
  formatFileName,
  htmlToPlainText,
  PlainTextToHtml,
} from "@/utils/tableFunctions";
import { EmailDTO } from "@/utils/types";
import React, { useEffect, useState } from "react";
import ScreenLoader from "../ScreenLoader";
import { IoMdClose } from "react-icons/io";

interface ComposeEmailProps {
  onSubmit: (emailContent: EmailDTO) => void;
  onCancel: () => void;
  data: {
    resumeFileName: string;
    jdFileName: string;
  };
}

const ComposeEmail = ({
  onSubmit,
  data: emailData,
  onCancel,
}: ComposeEmailProps) => {
  const [isMounted, setIsMouted] = useState(false);

  const { data, isLoading, error } = useGenerateEmail(
    emailData.resumeFileName,
    emailData.jdFileName.split(".")[0],
    emailData.jdFileName,
    isMounted
  );

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setSubject(data.subject || "");
      setBody(htmlToPlainText(data.body || ""));
    }
  }, [data]);

  useEffect(() => {
    setIsMouted(true);

    return () => {
      setIsMouted(false);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) {
      setFormError("Subject and body cannot be empty.");
      return;
    }
    setFormError(null);
    if (data) {
      onSubmit({
        ...data,
        createdAt: new Date().toISOString().replace("Z", ""),
        body,
        subject,
      });
    }
  };
  if (isLoading) return <ScreenLoader message="Generating email..." />;

  return (
    <form className="max-h-[70vh] mt-5" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center ">
        <h4 className="font-semibold mb-2 text-slate-800">Compose Email</h4>
        <IoMdClose
          onClick={onCancel}
          className="cursor-pointer"
          color="red"
          size={20}
        />
      </div>
      {formError && (
        <div className="mb-2 text-red-600 text-sm font-medium">{formError}</div>
      )}
      {error && (
        <div className="mb-2 text-red-600 text-sm font-medium">
          {error.message}
        </div>
      )}
      <div className="space-y-3 p-4 border border-gray-200  rounded-lg bg-white">
        <div>
          <label className="text-sm font-medium text-slate-600">To</label>
          <input
            type="text"
            value={data?.to}
            readOnly
            className="w-full p-2 mt-1 border border-slate-300 rounded-md bg-slate-100"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 mt-1 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-600">Body</label>
          <textarea
            rows={12}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 mt-1 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end ">
          <button
            onClick={() => onSubmit}
            disabled={!!formError}
            className={
              "px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            }
          >
            Send Email
          </button>
        </div>
      </div>
    </form>
  );
};

export default ComposeEmail;
