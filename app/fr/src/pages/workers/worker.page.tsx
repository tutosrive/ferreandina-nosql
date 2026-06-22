import React, { useEffect, useState } from "react";
import workerService from "../../services/worker.service";
import { useLocation, useNavigate } from "react-router-dom";
import LoaderPointsComponent from "../../components/LoaderPoints.component";
import TableTabulatorComponent from "../../components/TableTabulator.component";
import { Ripple } from "primereact/ripple";
import Swal from "sweetalert2";

export default function WorkersPage() {
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const filterIds = location.state?.filterIds as number[] | undefined;

  const getWorkers = async () => {
    setIsLoading(true);
    const res = await workerService.get_all();
    let data = res.data || [];

    if (location.state?.filterIds) {
      const rawFilter = location.state.filterIds;

      const idsToFilter = rawFilter
        .map((item: any) => {
          if (typeof item === "number") return item;
          if (typeof item === "string") return parseInt(item, 10);
          if (item && typeof item === "object") {
            return Number(item.id || item._id);
          }
          return NaN;
        })
        .filter((n: number) => !isNaN(n));

      data = data.filter((item: any) => {
        const currentId = Number(item.id || item._id);
        return idsToFilter.includes(currentId);
      });
    }

    setWorkers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getWorkers();
  }, [location.state?.filterIds]);

  const removeWorker = async (id: string | number) => {
    await workerService.delete(Number(id));
    await getWorkers();
  };

  const columns = [
    {
      title: "Actions",
      field: "actions",
      hozAlign: "center",
      headerSort: false,
      width: 180,
      formatter: () => `
        <div class="flex gap-2 justify-center">
          <button class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs view-btn">View</button>
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs edit-btn">Edit</button>
          <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs delete-btn">Delete</button>
        </div>
      `,
      cellClick: (e: any, cell: any) => {
        const data = cell.getRow().getData();
        const target = e.target as HTMLElement;
        const currentId = data._id || data.id;

        if (target.classList.contains("view-btn")) {
          navigate(`/workers/view/${currentId}`);
        } else if (target.classList.contains("edit-btn")) {
          navigate(`/workers/update/${currentId}`);
        } else if (target.classList.contains("delete-btn")) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this employee record!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) removeWorker(currentId);
          });
        }
      },
    },
    {
      title: "ID",
      field: "id",
      width: 70,
      hozAlign: "center",
      formatter: (cell: any) => {
        const data = cell.getRow().getData();
        return data._id || data.id || "";
      },
    },
    {
      title: "Image",
      field: "image",
      hozAlign: "center",
      headerSort: false,
      width: 90,
      formatter: (cell: any) => {
        const value = cell.getValue();
        return value
          ? `<img src="${value}" alt="Worker" class="w-10 h-10 object-cover rounded border border-gray-700 shadow-sm mx-auto" />`
          : `<span class="text-gray-400 italic text-xs">No image</span>`;
      },
    },
    { title: "Name", field: "name", width: 200 },
    { title: "Age", field: "age", width: 70, hozAlign: "center" },
    { title: "Speciality", field: "speciality", width: 130 },
    { title: "Weight", field: "weight", width: 80, hozAlign: "center" },
    { title: "Email", field: "email", width: 220 },
    { title: "Phone", field: "phone", width: 130 },
    {
      title: "Salary",
      field: "salary",
      hozAlign: "right",
      formatter: "money",
      formatterParams: {
        decimal: ".",
        thousand: ",",
        symbol: "$",
        precision: 0,
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6 px-4">
        <button
          onClick={() => navigate("/")}
          className="p-ripple orange-ripple bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
          <Ripple />
        </button>

        <div className="text-center">
          <h1 className="text-2xl font-bold">Workers</h1>
          {filterIds && (
            <span className="text-sm text-yellow-500">(Filtered View)</span>
          )}
        </div>

        <div className="flex gap-2">
          {filterIds && (
            <button
              onClick={() => navigate("/workers", { state: {} })}
              className="p-ripple bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
            >
              Clear Filter
              <Ripple />
            </button>
          )}
          <button
            onClick={() => navigate("/workers/create")}
            className="p-ripple orange-ripple bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Create New
            <Ripple />
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full px-4">
        {isLoading ? (
          <div className="w-full flex justify-center mt-20">
            <LoaderPointsComponent />
          </div>
        ) : (
          <div className="w-full">
            <TableTabulatorComponent data={workers} columns={columns} />
          </div>
        )}
      </div>
    </>
  );
}
