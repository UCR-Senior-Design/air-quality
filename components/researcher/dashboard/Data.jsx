"use client";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import { useState } from "react";
// import Search from "../Search";
// import Dropdown from "./Dropdown";
import Link from "next/link";
import Tag from "../Tag";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import { GoArrowRight } from "react-icons/go";

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
    cell: ({ getValue }) => {
      const computed = parseInt(
        new Date(
          new Date().getTime() -
            new Date(
              new Date(getValue()).getTime() -
                new Date().getTimezoneOffset() * 60000,
            ),
        ).getTime() /
          (1000 * 60),
      );

      return (
        <>
          {computed < 60 && <p>{computed} minutes ago</p>}
          {computed > 60 && <p>{(computed / 60).toFixed(2)} hours ago</p>}
        </>
      );
    },
  },
  {
    accessorKey: "outdoors",
    header: "Outdoors",
    cell: ({ getValue }) => (
      <Tag
        color={getValue() ? "1" : "0"}
        text={getValue() ? "True" : "False"}
      />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <Tag
        color={getValue() === "ACTIVE" ? "1" : "0"}
        text={
          getValue().charAt(0).toUpperCase() + getValue().slice(1).toLowerCase()
        }
      />
    ),
  },
  {
    accessorKey: "sn",
    header: "Link",
    cell: ({ getValue }) => (
      <Link href={`/researcher/data/${getValue()}`}>
        <div className="bg-table-grey w-fit px-4 py-1 rounded-xl flex justify-center items-center">
          More Data
          <GoArrowRight className="text-xl ml-1" />
        </div>
      </Link>
    ),
  },
];

const Data = ({ data }) => {
  // const [filters, setFilters] = useState([]);
  // const [option, setOption] = useState({
  //   text: "Serial Number",
  //   accessor: "sn",
  // });

  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    // state: {
    //   columnFilters: filters,
    // },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [],
    },
  });

  // const options = [
  //   {
  //     accessor: "description",
  //     text: "Description",
  //   },
  //   {
  //     accessor: "sn",
  //     text: "Serial Number",
  //   },
  //   {
  //     accessor: "model",
  //     text: "Model",
  //   },
  // ];

  return (
    <div className="mt-2 px-8 w-full h-1/2 overflow-y-scroll">
      {/* <div className="flex items-center gap-2">
        <Dropdown options={options} option={option} setOption={setOption} />
        <Search
          option={option.accessor}
          filters={filters}
          setFilters={setFilters}
        />
      </div> */}

      <div className="bg-air-blue-200 text-white rounded-t-lg">
        {getHeaderGroups().map(({ headers, id }) => (
          <div key={id} className="flex">
            {headers.map(({ id, column }) => (
              <div key={id} className="w-2/12 p-1 m-2">
                <span>{column.columnDef.header}</span>
                <button onClick={() => column.toggleSorting?.()}>
                  {column.getIsSorted() ? (
                    column.getIsSorted() === "desc" ? (
                      <FaSortAlphaDown />
                    ) : (
                      <FaSortAlphaUp />
                    )
                  ) : (
                    <TbArrowsSort />
                  )}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="overflow-y-scroll h-[85%]">
        {getRowModel().rows.map(({ id, getVisibleCells }) => (
          <div
            className="flex bg-white p-1 hover:bg-nav-hover hover:cursor-pointer transition-colors duration-300 mt-2 mb-2"
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
