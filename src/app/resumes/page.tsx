import ResumeContent from "@/components/resume/ResumeContent";
import ResumeUpload from "@/components/upload/ResumeUpload";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ pageNo: string; pageSize: string }>;
}) => {
  const { pageNo = "0", pageSize = "5" } = await searchParams;

  return (
    <div className="container mx-auto px-6 py-8">
      <ResumeUpload />
      <ResumeContent pageNo={pageNo} pageSize={pageSize} />
    </div>
  );
};

export default page;
