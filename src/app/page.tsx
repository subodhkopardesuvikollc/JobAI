import JobDescriptions from "@/components/JobDescriptions";

export type Candidates = {
  fileName: string;
  fileUrl: string;
  score: string;
};

export default function Home() {
  return (
    <div className="bg-gray-50 ">
      <JobDescriptions />
    </div>
  );
}
