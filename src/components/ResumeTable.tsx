"use client";
import { formatFileName } from "@/utils/tableFunctions";
import { FileWithUrl, PaginatedData } from "@/utils/types";
import Link from "next/link";
import { Suspense, useState } from "react";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";
import { revalidate } from "@/utils/revalidate";
import { IoMdRefresh } from "react-icons/io";

const ResumeTable = ({
  data: paginatedData,
}: {
  data: PaginatedData<FileWithUrl> | undefined;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const data = paginatedData?.content || [];
  const totalPages = paginatedData?.page.totalPages || 1;
  const router = useRouter();

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
            <div className="flex items-center justify-between mb-4 active:rotate-360 transition-all duration-500 rounded-full hover:bg-slate-100">
              <button
                onClick={() => revalidate(["resumes"])}
                className="text-gray-500 hover:text-blue-500 cursor-pointer transition-colors"
              >
                <IoMdRefresh size={20} />
              </button>
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

            <Suspense fallback={<div>Loading...</div>}>
              <tbody>
                {data.map((file, index) => (
                  <tr key={index} className="border-b border-slate-200">
                    <td className="py-2 px-4">
                      {formatFileName(file.file.fileName)}
                    </td>
                    <td className="py-2 px-4">
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
            </Suspense>
          </table>
          <Pagination
            showPrevNext
            maxVisiblePages={3}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
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
