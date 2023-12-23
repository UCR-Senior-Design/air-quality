"use client";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import Table from "../Table";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    width: "w-2/12",
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "email",
    header: "Email Address",
    width: "w-3/12",
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
  {
    accessorKey: "affiliation",
    header: "Affiliation",
    width: "w-2/12",
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
];

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api("GET", "/api/members").then(({ data }) => setData(data));
  }, []);

  return (
    <div className=" bg-yellow-500">
      <Table data={data} columns={columns} />
    </div>
  );
};

export default Data;
