import React, { useEffect } from "react";
import { useApp } from "@context";
import { Filters, DataTable, Pagination } from "@components";

function ProductsPage() {
  const { setEntity, setServerFilter, setPage, setSearchText } = useApp();

  useEffect(() => {
    setEntity("products");
    setServerFilter({ field: "", value: "" });
    setSearchText("");
    setPage(1);
  }, [setEntity, setServerFilter, setSearchText, setPage]);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Title", accessor: "title" },
    { header: "Brand", accessor: "brand" },
    { header: "Category", accessor: "category" },
    { header: "Description", accessor: "description" },
    { header: "Price", accessor: "price" },
    { header: "Discount %", accessor: "discountPercentage" },
    { header: "Rating", accessor: "rating" },
    { header: "Stock", accessor: "stock" },
    { header: "Thumbnail", accessor: "thumbnail" },
    { header: "Images", accessor: "images" },
  ];

  const fields = [
    { field: "title", label: "Title" },
    { field: "brand", label: "Brand" },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 style={{ color: "var(--main-black)" }}>Products</h3>
        <div className="text-muted">
          <small>Browse and filter products</small>
        </div>
      </div>

      <Filters fields={fields} />
      <DataTable columns={columns} />
      <Pagination />
    </div>
  );
}

export default ProductsPage;
