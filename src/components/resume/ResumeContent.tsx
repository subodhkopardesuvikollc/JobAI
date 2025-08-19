"use client";
import { useAllResumes } from "@/hooks/useResume";
import ResumeTable from "./ResumeTable";
import ScreenLoader from "../ScreenLoader";

const ResumeContent = ({
  pageNo,
  pageSize,
}: {
  pageNo: string;
  pageSize: string;
}) => {
  const { data, isLoading, isError, isFetching, refetch } = useAllResumes(
    pageNo,
    pageSize
  );

  if (isLoading) return <ScreenLoader message="Loading resumes..." />;
  if (isFetching) return <ScreenLoader message="Refreshing resumes..." />;
  if (isError) return <div>Error loading resumes</div>;

  return <ResumeTable paginatedData={data} refetch={refetch} />;
};

export default ResumeContent;
