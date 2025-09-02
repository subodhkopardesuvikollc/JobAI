import JdDetails from "@/components/jd/JdDetails";
import JdList from "@/components/jd/JdList";
import JobDescriptionUpload from "@/components/upload/JobDescriptionUpload";
import { File } from "@/utils/types";

interface Props {
  params: Promise<{ jdId: string }>;
}
export default async function Jd({ params }: Props) {
  const { jdId } = await params;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const data = await fetch(`${apiBaseUrl}/api/jd`, {
    cache: "force-cache",
    next: { tags: ["jds"] },
  });
  if (!data.ok) {
    throw new Error("Failed to fetch job descriptions: " + data.statusText);
  }
  const jdData: File[] = await data.json();

  return (
    <div className="bg-gray-50 ">
      <JobDescriptionUpload />
      {jdData && jdData.length > 0 && (
        <div className="container mx-auto max-w-5xl  justify-center mb-10 items-start w-full flex flex-col md:flex-row gap-10">
          <JdList jdData={jdData} jdId={jdId} />

          <JdDetails currentJD={jdData.find((jd) => jd.id === jdId)} />
        </div>
      )}
    </div>
  );
}
