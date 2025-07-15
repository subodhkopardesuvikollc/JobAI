"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const highlightClass =
    "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";
  return (
    <div>
      <nav className="container mx-auto py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-slate-800">
          Candidate Matcher
        </div>
        <div className={`flex items-center space-x-6`}>
          <Link
            href="/"
            className={`${
              pathname === "/"
                ? highlightClass
                : "text-slate-600 hover:text-blue-600 transition-colors"
            } `}
          >
            Job Descriptions
          </Link>
          <Link
            href="/resumes"
            className={`${
              pathname === "/resumes"
                ? highlightClass
                : "text-slate-600 hover:text-blue-600 transition-colors"
            }`}
          >
            Resumes
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
