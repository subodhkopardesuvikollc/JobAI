"use client";
import { formatFileName } from "@/utils/tableFunctions";
import { FileWithUrl, PaginatedData } from "@/utils/types";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import RefreshButton from "../ui/RefreshButton";

const ResumeTable = ({
  paginatedData,
  refetch,
}: {
  paginatedData: PaginatedData<FileWithUrl> | undefined;
  refetch: () => void;
}) => {
  const data = paginatedData?.content || [];
  const totalPages = paginatedData?.page.totalPages || 1;
  const router = useRouter();
  const params = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>();

  useEffect(() => {
    const page = params.get("pageNo")
      ? parseInt(params.get("pageNo") || "") + 1
      : 1;

    setCurrentPage(page);
  }, [params]);

  return (
    <div className="bg-white rounded-lg max-w-4xl mx-auto  shadow-md p-6">
      {!data || data.length === 0 ? (
        <div className="text-center">No resumes uploaded yet.</div>
      ) : (
        <div className="flex flex-col items-center  justify-center ">
          <div className="flex justify-end items-center w-full mb-4">
            <h2 className="text-2xl font-bold mr-auto mb-5">
              Uploaded Resumes
            </h2>
            <div className="flex items-center justify-between mb-4 ">
              <RefreshButton onRefresh={refetch} />
            </div>
          </div>

          <table className="w-full text-left mb-6">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="py-2 px-4 font-semibold">Candidate Name</th>
                <th className="py-2 px-4 font-semibold">Upload Date</th>
                <th className="py-2 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((file, index) => (
                <tr key={index} className="border-b border-slate-200">
                  <td className="py-2 px-4">
                    {formatFileName(file.file.fileName)}
                  </td>
                  <td className="py-2 px-4" suppressHydrationWarning>
                    {new Date(file.file.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 text-right font-semibold text-[14px]">
                    <div
                      className="w-fit ml-auto text-center"
                      style={file.fileUrl ? {} : { pointerEvents: "none" }}
                    >
                      <Link href={file.fileUrl || ""} target="_blank ">
                        {file.fileUrl ? (
                          <p className="text-blue-500 px-2 py-[1px] rounded-2xl hover:bg-blue-200 bg-blue-100  transition-colors">
                            View Resume
                          </p>
                        ) : (
                          <p className="text-red-400 px-2 py-[1px] rounded-2xl bg-red-100 cursor-not-allowed transition-colors">
                            Not Available
                          </p>
                        )}
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            showPrevNext
            maxVisiblePages={3}
            currentPage={currentPage || 1}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (currentPage === page) return;
              setCurrentPage(page);
              router.push(`?pageNo=${page - 1}`);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ResumeTable;
