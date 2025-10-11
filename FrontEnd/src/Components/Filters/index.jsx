import React, { useState, useEffect, useRef, useCallback } from "react";
import { useApp } from "@context";

const DEBOUNCE_DELAY = 350;

function Filters({ fields = [] }) {
  const {
    pageSize,
    setPageSize,
    serverFilter,
    setServerFilter,
    showSearch,
    setShowSearch,
    searchText,
    setSearchText,
    categories,
    bloods,
    genders,
    setPage,
    entity,
  } = useApp();

  const [openSize, setOpenSize] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchText || "");
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setSearchText(localSearch);
      setPage(1);
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [localSearch, setSearchText, setPage]);

  useEffect(() => {
    setLocalSearch(searchText || "");
  }, [searchText]);

  const onFilterChange = useCallback(
    (field, value) => {
      setServerFilter({ field, value });
      setPage(1);
    },
    [setServerFilter, setPage]
  );

  const handlePageSizeChange = useCallback(
    (size) => {
      setPageSize(size);
      setOpenSize(false);
      setPage(1);
    },
    [setPageSize, setPage]
  );

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="position-relative" style={{ minWidth: 160 }}>
            <button
              type="button"
              className="btn btn-outline-secondary w-100 d-flex justify-content-between align-items-center"
              onClick={() => setOpenSize((s) => !s)}
              aria-haspopup="listbox"
              aria-expanded={openSize}
              aria-label="Select page size"
            >
              <span>Page size: {pageSize}</span>
              <small className="ms-2" aria-hidden="true">
                {openSize ? "▲" : "▼"}
              </small>
            </button>

            {openSize && (
              <div
                className="card position-absolute mt-2"
                style={{ zIndex: 50, width: "100%" }}
              >
                <div className="list-group list-group-flush">
                  {[5, 10, 20, 50].map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={
                        "list-group-item list-group-item-action text-start " +
                        (s === pageSize ? "active" : "")
                      }
                      onClick={() => handlePageSizeChange(s)}
                      aria-label={`Set page size to ${s}`}
                    >
                      {s} items
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search toggle and input */}
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-light me-2"
              onClick={() => setShowSearch((v) => !v)}
              aria-pressed={showSearch}
              aria-label="Toggle client-side search"
              title="Toggle search"
            >
              🔍
            </button>

            {showSearch && (
              <input
                className="form-control"
                style={{ minWidth: 220 }}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search all columns..."
                aria-label="Search input"
              />
            )}
          </div>

          {/* Category filter for products */}
          {entity === "products" &&
            Array.isArray(categories) &&
            categories.length > 0 && (
              <div className="d-flex align-items-center gap-2">
                <label htmlFor="category-filter" className="fw-bold mb-0">
                  Category:
                </label>
                <select
                  id="category-filter"
                  className="form-select"
                  style={{ width: 200 }}
                  value={
                    serverFilter.field === "category" ? serverFilter.value : ""
                  }
                  onChange={(e) => onFilterChange("category", e.target.value)}
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat, i) => {
                    if (typeof cat === "string") {
                      const label = cat.charAt(0).toUpperCase() + cat.slice(1);
                      return (
                        <option key={cat} value={cat}>
                          {label}
                        </option>
                      );
                    }

                    if (cat && typeof cat === "object") {
                      const value =
                        cat.slug ?? cat.value ?? cat.name ?? String(i);
                      const label = cat.name ?? cat.slug ?? JSON.stringify(cat);
                      return (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      );
                    }

                    return (
                      <option key={i} value={String(cat)}>
                        {String(cat)}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

          {entity === "users" && Array.isArray(bloods) && (
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="blood-filter" className="fw-bold mb-0">
                Blood Group:
              </label>
              <select
                id="blood-filter"
                className="form-select"
                style={{ width: 200 }}
                value={
                  serverFilter.field === "bloodGroup" ? serverFilter.value : ""
                }
                onChange={(e) => onFilterChange("bloodGroup", e.target.value)}
                aria-label="Filter by blood group"
              >
                <option value="">All</option>
                {bloods.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>
          )}

          {entity === "users" && Array.isArray(genders) && (
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="gender-filter" className="fw-bold mb-0">
                Gender:
              </label>
              <select
                id="gender-filter"
                className="form-select"
                style={{ width: 200 }}
                value={
                  serverFilter.field === "gender" ? serverFilter.value : ""
                }
                onChange={(e) => onFilterChange("gender", e.target.value)}
                aria-label="Filter by gender"
              >
                <option value="">All</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {fields.map((f) => (
            <div key={f.field} className="d-flex align-items-center gap-2">
              <label
                htmlFor={`filter-${f.field}`}
                className="fw-bold mb-0"
                style={{ minWidth: 80 }}
              >
                {f.label}:
              </label>
              <input
                id={`filter-${f.field}`}
                className="form-control"
                style={{ width: 180 }}
                value={serverFilter.field === f.field ? serverFilter.value : ""}
                onChange={(e) => onFilterChange(f.field, e.target.value)}
                placeholder={`Filter by ${f.label}`}
                aria-label={`Filter by ${f.label}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filters;
