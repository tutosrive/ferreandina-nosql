import React, { useEffect, useRef } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

interface TableTabulatorProps {
  data: any[];
  columns: any[];
}

export default function TableTabulatorComponent({
  data,
  columns,
}: TableTabulatorProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const tabulatorRef = useRef<Tabulator | null>(null);

  useEffect(() => {
    if (tableRef.current && !tabulatorRef.current) {
      tabulatorRef.current = new Tabulator(tableRef.current, {
        data: data,
        reactiveData: true,
        columns: columns,
        layout: "fitColumns",
        pagination: true,
        paginationSize: 10,
        paginationSizeSelector: [5, 10, 25, 50],
      });
    }

    return () => {
      if (tabulatorRef.current) {
        tabulatorRef.current.destroy();
        tabulatorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (tabulatorRef.current && data) {
      tabulatorRef.current.replaceData(data);
    }
  }, [data]);

  return <div ref={tableRef} className="w-full border rounded shadow-sm"></div>;
}
