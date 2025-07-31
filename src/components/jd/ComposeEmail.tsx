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

  const { data, isLoading, error, refetch } = useGenerateEmail(
    emailData.resumeFileName,
    emailData.jdFileName.split(".")[0],
    emailData.jdFileName,
    isMounted
  );

  const [subject, setSubject] = useState(data?.subject || "");
  const [body, setBody] = useState(htmlToPlainText(data?.body || ""));
  const [formError, setFormError] = useState<string | null>(null);

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
    console.log("Submitting: ", {
      to: data?.to,
      subject,
      body: PlainTextToHtml(body),
    });
  };
  if (isLoading) return <ScreenLoader message="Generating email..." />;

  return (
    <form className="p-6 max-h-[70vh] " onSubmit={handleSubmit}>
      <div className="flex justify-between items-center">
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
      <div className="space-y-3 p-4 border rounded-lg bg-white">
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
            rows={20}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full p-2 mt-1 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end items-center p-4 rounded-b-xl space-x-3">
          <button
            onClick={() => refetch()}
            type="button"
            className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Re-Generate
          </button>
          <button
            disabled={!!formError}
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send Email
          </button>
        </div>
      </div>
    </form>
  );
};

export default ComposeEmail;
