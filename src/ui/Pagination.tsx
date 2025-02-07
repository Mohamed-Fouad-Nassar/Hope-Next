"use client";

import clsx from "clsx";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({
  count,
  pageSize,
}: {
  count: number;
  pageSize: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(count / pageSize);

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams);

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white mt-8 pt-8">
      <div className="flex flex-col gap-4 sm:flex-row flex-1 items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {currentPage === totalPages ? count : currentPage * pageSize}
            </span>{" "}
            of <span className="font-medium">{count}</span> results
          </p>
        </div>

        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <PaginationBtn
              dir="prev"
              disabled={currentPage <= 1}
              handlePagination={() =>
                router.replace(createPageURL(currentPage - 1))
              }
            >
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              <span className="text-sm">Previous</span>
            </PaginationBtn>

            <div className="px-4 ring-1 ring-inset ring-gray-300 flex items-center gap-2">
              {currentPage} / {totalPages}
            </div>

            <PaginationBtn
              dir="next"
              disabled={currentPage >= totalPages}
              handlePagination={() =>
                router.replace(createPageURL(currentPage + 1))
              }
            >
              <span className="text-sm">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </PaginationBtn>
          </nav>
        </div>
      </div>
    </div>
  );
}

function PaginationBtn({
  dir,
  disabled,
  children,
  handlePagination,
}: {
  dir: "next" | "prev";
  disabled: boolean;
  children: React.ReactNode;
  handlePagination: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={handlePagination}
      className={clsx(
        "relative inline-flex items-center px-2 py-2 text-gray-800 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50",
        { "rounded-r-md": dir === "next", "rounded-l-md": dir === "prev" }
      )}
    >
      {children}
    </button>
  );
}
