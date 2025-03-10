import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Teacher = {
  id: string;
  name: string;
  teacherId: string;
  email?: string;
  photo: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
};

const columns = [
  { header: "Info", accesor: "info" },
  {
    header: "TeacherId",
    accesor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accesor: "subjects",
    className: "hidden md:table-cell",
  },
  { header: "Classes", accesor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accesor: "phone", className: "hidden md:table-cell" },
  { header: "Address", accesor: "address", className: "hidden md:table-cell" },
  { header: "Actions", accesor: "actions", className: "hidden md:table-cell" },
];

const TeachersListPage = () => {
  const renderRow = (item: Teacher) => (
    <tr key={item.id}>
      <td>
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.teacherId}</td>
      <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
      <td className="hidden md:table-cell">{item.classes.join(",")}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button
              className="w-7 h-7 flex items-center justify-center bg-lamaSky rounded-full"
              title="View"
            >
              <Image src="/view.png" alt="" width={16} height={16} />
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
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* ----------------------------------- TOP ---------------------------------- */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
            <button
              className="w-8 h-8 flex items-center justify-center bg-lamaYellow rounded-full"
              title="Add"
            >
              <Image src="/plus.png" alt="Add" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      {/* ---------------------------------- LIST ---------------------------------- */}
      <Table renderRow={renderRow} columns={columns} data={teachersData} />
      {/* ------------------------------- PAGINATION ------------------------------- */}

      <Pagination />
    </div>
  );
};

export default TeachersListPage;
