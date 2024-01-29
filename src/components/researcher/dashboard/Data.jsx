"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Search from "../Search";
import Dropdown from "./Dropdown";
import Link from "next/link";

const columns = [
  {
    accessorKey: "sn",
    header: "Serial Number",
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ getValue }) => <p>{getValue().toUpperCase()}</p>,
  },
  {
    accessorKey: "last_seen",
    header: "Last Seen",
    cell: ({ getValue }) => (
      <p>
        {parseInt(
          new Date(
            new Date().getTime() - new Date(getValue()).getTime()
          ).getTime() /
            (1000 * 60)
        )}{" "}
        minutes ago
      </p>
    ),
  },
  {
    accessorKey: "outdoors",
    header: "Outdoors",
    cell: ({ getValue }) => <p>{getValue() ? "true" : "false"}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "sn",
    header: "Link",
    cell: ({ getValue }) => (
      <Link href={`/researcher/data/${getValue()}`}>MORE DATA</Link>
    ),
  },
];

const Data = ({ data }) => {
  const [filters, setFilters] = useState([]);
  const [option, setOption] = useState({
    text: "Serial Number",
    accessor: "sn",
  });

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    state: {
      columnFilters: filters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const options = [
    {
      accessor: "description",
      text: "Description",
    },
    {
      accessor: "sn",
      text: "Serial Number",
    },
    {
      accessor: "model",
      text: "Model",
    },
  ];

  return (
    <div className="mt-6 pr-10 pl-8 h-1/2 w-full overflow-scroll p-2">
      <div className="flex items-center gap-2">
        <Dropdown options={options} option={option} setOption={setOption} />
        <Search
          option={option.accessor}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <div className="mt-4 bg-air-blue-200 text-white">
        {getHeaderGroups().map(({ headers, id }) => (
          <div key={id} className="flex">
            {headers.map(({ id, column }) => (
              <div key={id} className="w-2/12 p-1 m-2">
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
              <div className="w-2/12 p-1 m-2" key={id}>
                {flexRender(column.columnDef.cell, getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
