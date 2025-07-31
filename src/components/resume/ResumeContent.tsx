import { fetchResumeData } from "@/utils/helperFunctions";
import React from "react";
import ResumeTable from "./ResumeTable";

const ResumeContent = async ({
  pageNo,
  pageSize,
}: {
  pageNo: string;
  pageSize: string;
}) => {
  const data = await fetchResumeData(pageNo, pageSize);
  return <ResumeTable paginatedData={data} />;
};

export default ResumeContent;
