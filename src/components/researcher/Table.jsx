"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Search from "./Search";

const Data = ({ data, columns }) => {
  const [filters, setFilters] = useState([]);

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    state: {
      columnFilters: filters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <>
      <Search filters={filters} setFilters={setFilters} />
      <div className="bg-air-blue text-white">
        {getHeaderGroups().map(({ headers, id }) => (
          <div key={id} className="flex">
            {headers.map(({ id, column }) => (
              <div key={id} className={`${column.columnDef.width} p-1 m-2`}>
                {column.columnDef.header}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        {getRowModel().rows.map(({ id, getVisibleCells }) => (
          <div
            className="flex bg-white py-2 hover:bg-white/90 hover:cursor-pointer"
            key={id}
          >
            {getVisibleCells().map(({ id, column, getContext }) => (
              <div className={`${column.columnDef.width} p-1 m-2`} key={id}>
                {flexRender(column.columnDef.cell, getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Data;
