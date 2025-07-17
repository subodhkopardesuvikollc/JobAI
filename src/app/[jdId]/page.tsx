import JdDetails from "@/components/JdDetails";
import JdList from "@/components/JdList";
import JobDescriptionUpload from "@/components/JobDescriptionUpload";
import { File } from "@/utils/types";

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
  const jdData: File[] = await data.json();

  return (
    <div className="bg-gray-50 ">
      <JobDescriptionUpload />
      <div className="container mx-auto max-w-5xl  justify-center mb-10 items-start w-full flex flex-col md:flex-row gap-10">
        <JdList jdData={jdData} jdId={jdId} />

        <JdDetails jdData={jdData} jdId={jdId || jdData[0]?.id} />
      </div>
    </div>
  );
}
