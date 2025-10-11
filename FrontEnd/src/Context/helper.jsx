import React from "react";

export function getValue(row, accessor) {
  if (accessor == null || row == null) return undefined;

  if (typeof accessor === "function") {
    try {
      return accessor(row);
    } catch {
      return undefined;
    }
  }

  if (typeof accessor !== "string") return row[accessor];

  const parts = accessor.split(".");
  let val = row;
  for (const p of parts) {
    if (val == null) return undefined;
    const idx = Number(p);
    val = Number.isNaN(idx) ? val[p] : val[idx];
  }
  return val;
}

export function renderCell(row, columnOrAccessor) {
  let column = null;
  let accessor = null;

  if (
    typeof columnOrAccessor === "string" ||
    typeof columnOrAccessor === "function"
  ) {
    accessor = columnOrAccessor;
  } else if (columnOrAccessor && typeof columnOrAccessor === "object") {
    column = columnOrAccessor;
    accessor = column.accessor;
  }

  if (column && typeof column.render === "function") {
    try {
      const out = column.render(row);
      if (React.isValidElement(out) || out !== undefined) return out;
    } catch {}
  }

  if (column && typeof column.Cell === "function") {
    const value = getValue(row, accessor);
    try {
      return column.Cell({ value, row });
    } catch {}
  }

  if (column && typeof column.formatter === "function") {
    try {
      return column.formatter(getValue(row, accessor), row);
    } catch {}
  }

  const val = getValue(row, accessor);

  if (val == null) return <span className="text-muted">—</span>;

  if (React.isValidElement(val)) return val;

  if (typeof val === "string") {
    const lowerAccessor = String(accessor || "").toLowerCase();

    const looksLikeImage =
      lowerAccessor.includes("image") ||
      lowerAccessor.includes("thumbnail") ||
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(val) ||
      /^https?:\/\//i.test(val);

    if (looksLikeImage) {
      return (
        <img
          src={val}
          alt={row?.name ?? row?.title ?? ""}
          loading="lazy"
          style={{
            maxWidth: 100,
            maxHeight: 60,
            objectFit: "cover",
            borderRadius: 4,
          }}
          onError={(e) => {
            try {
              e.currentTarget.style.display = "none";
            } catch {}
          }}
          aria-hidden="true"
        />
      );
    }

    if (val.length > 120) {
      return <span title={val}>{val.slice(0, 117) + "…"}</span>;
    }

    return val;
  }

  if (Array.isArray(val)) {
    const isImageArray = val.every(
      (it) =>
        typeof it === "string" &&
        (/^https?:\/\//i.test(it) || /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(it))
    );

    if (isImageArray) {
      return (
        <div className="d-flex flex-wrap gap-1">
          {val.slice(0, 3).map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              loading="lazy"
              style={{
                maxWidth: 60,
                maxHeight: 40,
                objectFit: "cover",
                borderRadius: 4,
              }}
              onError={(e) => {
                try {
                  e.currentTarget.style.display = "none";
                } catch {}
              }}
              aria-hidden="true"
            />
          ))}
          {val.length > 3 && (
            <span className="badge bg-secondary align-self-center">
              +{val.length - 3}
            </span>
          )}
        </div>
      );
    }

    return (
      <span className="text-muted" title={JSON.stringify(val)}>
        [{val.length} items]
      </span>
    );
  }

  if (typeof val === "object") {
    if (val?.name) return String(val.name);
    if (val?.title) return String(val.title);

    try {
      const s = JSON.stringify(val);
      return (
        <span
          className="text-muted font-monospace"
          style={{ fontSize: "0.85rem" }}
        >
          {s.length > 80 ? s.slice(0, 77) + "…" : s}
        </span>
      );
    } catch {
      return <span className="text-muted">[Object]</span>;
    }
  }

  if (typeof val === "boolean") {
    return (
      <span className={`badge ${val ? "bg-success" : "bg-secondary"}`}>
        {val ? "Yes" : "No"}
      </span>
    );
  }

  if (typeof val === "number") {
    const lowerAccessor = String(accessor || "").toLowerCase();
    if (lowerAccessor.includes("price") || lowerAccessor.includes("cost")) {
      return <span className="text-success fw-bold">${val.toFixed(2)}</span>;
    }
    if (lowerAccessor.includes("rating")) {
      return <span>{val.toFixed(1)} ⭐</span>;
    }
    if (
      lowerAccessor.includes("percent") ||
      lowerAccessor.includes("discount")
    ) {
      return <span className="text-danger">{val.toFixed(1)}%</span>;
    }
    return val.toLocaleString();
  }

  return String(val);
}
