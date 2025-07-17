import JobDescriptions from "@/components/JobDescriptions";
import JobDescriptionUpload from "@/components/JobDescriptionUpload";
import { JobDescription } from "@/utils/types";

interface Props {
  searchParams: Promise<{ jdId: string }>;
}
export default async function Jd({ searchParams }: Props) {
  const { jdId } = await searchParams;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const data = await fetch(`${apiBaseUrl}/api/jd`, { cache: "force-cache" });
  if (!data.ok) {
    throw new Error("Failed to fetch job descriptions" + data);
  }
  const jdData: JobDescription[] = await data.json();

  return (
    <div className="bg-gray-50 ">
      <JobDescriptionUpload />
      <JobDescriptions jdData={jdData} jdId={jdId || jdData[0]?.id} />
    </div>
  );
}
