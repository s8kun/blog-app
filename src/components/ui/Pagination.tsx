import React from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="mt-12 flex items-center justify-center">
      {/* Desktop / large screens: keep simple Previous / Page X of Y / Next */}
      <div className="hidden sm:flex items-center justify-center space-x-4">
        {currentPage > 1 ? (
          <Link
            to={currentPage - 1 === 1 ? `/` : `?page=${currentPage - 1}`}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <Button
              variant="ghost"
              className="flex items-center space-x-2"
              aria-label="Go to previous page"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </Button>
          </Link>
        ) : (
          <Button
            variant="ghost"
            disabled
            className="flex items-center space-x-2"
            aria-label="Go to previous page"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </Button>
        )}

        <span className="font-semibold text-on-background" aria-live="polite">
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages ? (
          <Link
            to={`?page=${currentPage + 1}`}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <Button
              variant="ghost"
              className="flex items-center space-x-2"
              aria-label="Go to next page"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        ) : (
          <Button
            variant="ghost"
            disabled
            className="flex items-center space-x-2"
            aria-label="Go to next page"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Mobile: numbered pages with left/right arrows */}
      <div className="flex sm:hidden items-center space-x-2">
        {/* Left arrow */}
        {currentPage > 1 ? (
          <Link
            to={currentPage - 1 === 1 ? `/` : `?page=${currentPage - 1}`}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            <button className="p-2 rounded-md bg-surface hover:bg-surface/80">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </Link>
        ) : (
          <div className="p-2 rounded-md bg-surface/50 opacity-50">
            <ChevronLeft className="w-5 h-5" />
          </div>
        )}

        {/* Page numbers: show a window of pages (max 5) */}
        {(() => {
          const maxButtons = 5;
          const half = Math.floor(maxButtons / 2);
          let start = Math.max(1, currentPage - half);
          let end = start + maxButtons - 1;
          if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxButtons + 1);
          }
          const pages = [] as number[];
          for (let p = start; p <= end; p++) pages.push(p);
          return pages.map((p) => (
            <Link
              key={p}
              to={p === 1 ? `/` : `?page=${p}`}
              onClick={() => onPageChange(p)}
            >
              <button
                className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium ${
                  p === currentPage
                    ? "bg-primary text-white"
                    : "bg-surface text-on-surface hover:bg-surface/90"
                }`}
                aria-current={p === currentPage ? "page" : undefined}
              >
                {p}
              </button>
            </Link>
          ));
        })()}

        {/* Right arrow */}
        {currentPage < totalPages ? (
          <Link
            to={`?page=${currentPage + 1}`}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
          >
            <button className="p-2 rounded-md bg-surface hover:bg-surface/80">
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
        ) : (
          <div className="p-2 rounded-md bg-surface/50 opacity-50">
            <ChevronRight className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
