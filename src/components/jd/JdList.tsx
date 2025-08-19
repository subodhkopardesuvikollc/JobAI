"use client";
import { revalidate } from "@/utils/revalidate";
import { formatFileName } from "@/utils/tableFunctions";
import { File } from "@/utils/types";
import Link from "next/link";
import RefreshButton from "../ui/RefreshButton";

const JdList = ({
  jdData,
  jdId,
}: {
  jdData: File[];
  jdId: string | string[] | undefined;
}) => {
  return (
    <div className=" px-4 pt-6 mx-auto  min-w-[250px] h-[450px]  bg-white rounded-lg shadow-md">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold mb-4 px-2">Available JDs</h3>
        <div className="flex items-center justify-between  mb-4 ">
          <RefreshButton onRefresh={() => revalidate(["jds"])} />
        </div>
      </div>

      <div className="space-y-2 flex flex-col overflow-y-auto h-[350px]">
        {jdData.map((job) => (
          <Link
            href={`/jd/${job.id}`}
            scroll={false}
            className={` hover:cursor-pointer ${
              jdId === job.id
                ? "bg-blue-100 text-blue-500 font-semibold"
                : "hover:bg-slate-100"
            } p-2 rounded-md transition-colors`}
            key={job.id}
          >
            {formatFileName(job.fileName)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JdList;
