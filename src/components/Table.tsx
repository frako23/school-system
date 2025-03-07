import React from "react";

const Table = ({
  columns,
}: {
  columns: { header: string; accesor: string; classname?: string }[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accesor}>{col.header}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default Table;
