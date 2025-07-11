import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { eventsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { Class, Event, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type EventList = Event & {
  class: Class;
};

const columns = [
  { header: "Title", accessor: "title" },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "actions" },
];

const renderRow = (item: EventList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(item.startTime)}
    </td>
    <td className="hidden md:table-cell">
      {item.startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td className="hidden md:table-cell">
      {item.endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })}
    </td>
    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button
            className="w-7 h-7 flex items-center justify-center bg-lamaSky rounded-full"
            title="Edit"
          >
            <Image src="/edit.png" alt="" width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && (
          <button
            className="w-7 h-7 flex items-center justify-center bg-lamaPurple rounded-full"
            title="Delete"
          >
            <Image src="/delete.png" alt="" width={16} height={16} />
          </button>
        )}
      </div>
    </td>
  </tr>
);
const EventListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  // URL PARAMS CONDITION
  const query: Prisma.EventWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }
  const [data, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: true,
      },
      take: ITEMS_PER_PAGE,
      skip: (p - 1) * ITEMS_PER_PAGE,
    }),
    prisma.event.count({
      where: query,
    }),
  ]);
  
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* ----------------------------------- TOP ---------------------------------- */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button
              className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full"
              title="Filter"
            >
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full"
              title="Sort"
            >
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "admin" && (
              <button
                className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full"
                title="Add"
              >
                <Image src="/create.png" alt="Add" width={14} height={14} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* ---------------------------------- LIST ---------------------------------- */}
      <Table renderRow={renderRow} columns={columns} data={data} />
      {/* ------------------------------- PAGINATION ------------------------------- */}

      <Pagination page={p} count={count} />
    </div>
  );
};

export default EventListPage;
