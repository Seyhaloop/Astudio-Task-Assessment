import React, { useMemo } from "react";
import { useApp, getValue, renderCell } from "@context";

function DataTable({ columns = [] }) {
  const { data = [], loading, error, searchText } = useApp();

  const filtered = useMemo(() => {
    if (!searchText) return data;
    const t = searchText.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const v = getValue(row, col.accessor);
        if (v == null) return false;

        if (typeof v === "object") {
          return JSON.stringify(v).toLowerCase().includes(t);
        }

        return String(v).toLowerCase().includes(t);
      })
    );
  }, [searchText, data, columns]);

  if (loading) {
    return (
      <div className="card mb-3">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="alert alert-danger" role="alert">
            <h5 className="alert-heading">Error Loading Data</h5>
            <p className="mb-0">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive card mb-3">
      <table className="table table-hover table-sm mb-0">
        <thead className="table-light">
          <tr>
            {columns.map((c, colIdx) => (
              <th
                key={`${c.accessor}-${colIdx}`}
                className="align-middle"
                scope="col"
              >
                {c.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                <div className="text-muted">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mb-2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="mb-0">No data found</p>
                  {searchText && (
                    <small>Try adjusting your search or filters</small>
                  )}
                </div>
              </td>
            </tr>
          ) : (
            filtered.map((row, rowIndex) => (
              <tr key={row.id ?? `row-${rowIndex}`}>
                {columns.map((c, colIdx) => (
                  <td key={`${c.accessor}-${colIdx}`} className="align-top">
                    {renderCell(row, c)} {/* <-- pass full column object */}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
