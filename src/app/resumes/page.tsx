import ResumeContent from "@/components/resume/ResumeContent";
import ResumeUpload from "@/components/upload/ResumeUpload";
import ScreenLoader from "@/components/ScreenLoader";
import { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ pageNo: string; pageSize: string }>;
}) => {
  const { pageNo = "0", pageSize = "5" } = await searchParams;

  return (
    <div className="container mx-auto px-6 py-8">
      <ResumeUpload />
      <Suspense fallback={<ScreenLoader message="Loading resumes..." />}>
        <ResumeContent pageNo={pageNo} pageSize={pageSize} />
      </Suspense>
    </div>
  );
};

export default page;
