import React, { useEffect } from "react";
import { useApp } from "@context";
import { Filters, DataTable, Pagination } from "@components";

function UsersPage() {
  const { setEntity, setServerFilter, setPage, setSearchText } = useApp();

  useEffect(() => {
    setEntity("users");
    setServerFilter({ field: "", value: "" });
    setSearchText("");
    setPage(1);
  }, [setEntity, setServerFilter, setSearchText, setPage]);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "First Name", accessor: "firstName" },
    { header: "Last Name", accessor: "lastName" },
    { header: "Username", accessor: "username" },
    {
      header: "Email",
      accessor: "email",
      render: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
    },
    {
      header: "Phone",
      accessor: "phone",
      render: (row) => <a href={`tel:${row.phone}`}>{row.phone}</a>,
    },
    { header: "Age", accessor: "age" },
    { header: "Gender", accessor: "gender" },
    { header: "Company", accessor: "company.name" },
    { header: "University", accessor: "university" },
    { header: "Blood Group", accessor: "bloodGroup" },
    { header: "Image", accessor: "image" },
  ];

  const fields = [
    { field: "firstName", label: "First Name" },
    { field: "lastName", label: "Last Name" },
  ];

  return (
    <div>
      <h3 style={{ color: "var(--main-black)" }}>Users</h3>
      <Filters fields={fields} />
      <DataTable columns={columns} />
      <Pagination />
    </div>
  );
}

export default UsersPage;
