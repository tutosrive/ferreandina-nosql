import React from "react";
import "react-tabulator/lib/styles.css";
import "react-tabulator/lib/css/tabulator.min.css";
import { ReactTabulator } from "react-tabulator";

interface TableTabulatorProps {
  data: any[];
  columns: any[];
}

export default function TableTabulatorComponent({
  data,
  columns,
}: TableTabulatorProps) {
  
  const options = {
    layout: "fitColumns",
    pagination: true,
    paginationSize: 10,
    paginationSizeSelector: [5, 10, 25, 50],
  };

  return (
    <div className="w-full border rounded shadow-sm">
      <ReactTabulator
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}