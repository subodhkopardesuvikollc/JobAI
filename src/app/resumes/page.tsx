import ResumeTable from "@/components/ResumeTable";
import ResumeUpload from "@/components/ResumeUpload";
import { FileWithUrl, PaginatedData } from "@/utils/types";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ pageNo: number; pageSize: number }>;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { pageNo = 0, pageSize = 5 } = await searchParams;
  const queryParams = new URLSearchParams();
  queryParams.append("pageNo", pageNo.toString());
  queryParams.append("pageSize", pageSize.toString());
  const data = await fetch(`${baseUrl}/api/resume?${queryParams.toString()}`, {
    cache: "force-cache",
    next: { tags: ["resumes"] },
  });
  if (!data.ok) {
    throw new Error("Failed to fetch resumes" + data);
  }
  const resumesData: PaginatedData<FileWithUrl> = await data.json();
  return (
    <div className="container mx-auto px-6 py-8">
      <ResumeUpload />
      <ResumeTable data={resumesData} />
    </div>
  );
};

export default page;
