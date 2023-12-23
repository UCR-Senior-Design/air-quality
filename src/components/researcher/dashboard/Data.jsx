"use client";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";
import Table from "../Table";

const columns = [
  {
    accessorKey: "sn",
    header: "Serial Number",
    width: "w-2/12",
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
    width: "w-2/12",
    cell: ({ getValue }) => <p>{getValue().toUpperCase()}</p>,
  },
  {
    accessorKey: "last_seen",
    header: "Last Seen",
    width: "w-2/12",
    cell: ({ getValue }) => (
      <p>
        {parseInt(
          new Date(
            new Date().getTime() - new Date(getValue()).getTime(),
          ).getTime() /
            (1000 * 60),
        )}{" "}
        minutes ago
      </p>
    ),
  },
  {
    accessorKey: "outdoors",
    header: "Outdoors",
    width: "w-2/12",
    cell: ({ getValue }) => <p>{getValue() ? "true" : "false"}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    width: "w-2/12",
    cell: ({ getValue }) => <p>{getValue()}</p>,
  },
];

const Data = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api("GET", "/api/locations").then(({ data }) => setData(data));
  }, []);

  return (
    <div className="h-1/2 w-full bg-yellow-500 overflow-scroll p-2">
      <Table data={data} columns={columns} />
    </div>
  );
};

export default Data;
