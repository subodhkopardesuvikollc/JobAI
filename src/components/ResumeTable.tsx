"use client";
import { formatFileName } from "@/utils/tableFunctions";
import { FileWithUrl, PaginatedData } from "@/utils/types";
import Link from "next/link";
import { Suspense, useState } from "react";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";

const ResumeTable = ({
  data: paginatedData,
}: {
  data: PaginatedData<FileWithUrl> | undefined;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const data = paginatedData?.content || [];
  const totalPages = paginatedData?.totalPages || 1;
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg max-w-4xl mx-auto  shadow-md p-6">
      {data && data.length > 0 && (
        <div className="flex flex-col items-center  justify-center ">
          <h2 className="text-2xl font-bold mr-auto mb-5">Uploaded Resumes</h2>
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
                    <td className="py-2 px-4 text-right">
                      <Link
                        href={file.fileUrl}
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        View Resume
                      </Link>
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
