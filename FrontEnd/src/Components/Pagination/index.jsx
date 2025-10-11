import React, { useMemo } from "react";
import { useApp } from "@context";

function Pagination() {
  const { page, setPage, total, pageSize } = useApp();
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const visiblePages = useMemo(() => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    let prev = 0;
    for (const i of range) {
      if (prev && i - prev > 1) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  }, [page, totalPages]);

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav aria-label="Table pagination">
      <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
        <div className="text-muted">
          <small>
            Page {page} of {totalPages} ({total} total items)
          </small>
        </div>

        <ul className="pagination mb-0 flex-wrap">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
              aria-label="Go to first page"
            >
              ⟪
            </button>
          </li>
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              aria-label="Go to previous page"
            >
              &laquo;
            </button>
          </li>

          {visiblePages.map((p, idx) => {
            if (p === "...") {
              return (
                <li key={`dots-${idx}`} className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              );
            }

            return (
              <li
                key={p}
                className={`page-item ${p === page ? "active" : ""}`}
                aria-current={p === page ? "page" : undefined}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(p)}
                  aria-label={`Go to page ${p}`}
                >
                  {p}
                </button>
              </li>
            );
          })}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              aria-label="Go to next page"
            >
              &raquo;
            </button>
          </li>
          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(totalPages)}
              disabled={page === totalPages}
              aria-label="Go to last page"
            >
              ⟫
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Pagination;
