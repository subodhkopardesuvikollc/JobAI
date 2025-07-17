import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPrevNext = true,
  maxVisiblePages = 3,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-1 transition-colors duration-200">
      {/* Previous Button */}
      {showPrevNext && (
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-600 bg-white   rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
      )}

      {/* Page Numbers */}
      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm font-medium rounded-md min-w-[40px] ${
            page === currentPage
              ? "text-white bg-blue-600  "
              : "text-gray-600 bg-white   hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      {showPrevNext && (
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-600 bg-white  rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Pagination;
