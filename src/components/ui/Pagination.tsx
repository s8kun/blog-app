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
    <div className="flex items-center justify-center space-x-4 mt-12">
      {currentPage > 1 ? (
        <Link
          to={`?page=${currentPage - 1}`}
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
  );
};

export default Pagination;
