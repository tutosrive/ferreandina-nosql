import React, { useEffect, useState } from "react";
import branchService from "../../services/branch.service";
import { useNavigate } from "react-router-dom";
import LoaderPointsComponent from "../../components/LoaderPoints.component";
import TableTabulatorComponent from "../../components/TableTabulator.component";
import { Ripple } from "primereact/ripple";
import Swal from "sweetalert2";

export default function BranchesPage() {
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();

  const getBranches = async () => {
    const res = await branchService.get_all();
    setBranches(res.data || []);
  };

  useEffect(() => {
    getBranches();
  }, []);

  const removeBranch = async (id: string | number) => {
    await branchService.delete(Number(id));
    await getBranches();
  };

  const columns = [
    {
      title: "Actions",
      field: "actions",
      hozAlign: "center",
      headerSort: false,
      width: 200,
      formatter: () => {
        return `
          <div class="flex gap-2 justify-center">
            <button class="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs view-btn">View</button>
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs edit-btn">Edit</button>
            <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs delete-btn">Delete</button>
          </div>
        `;
      },
      cellClick: (e: any, cell: any) => {
        const data = cell.getRow().getData();
        const target = e.target as HTMLElement;
        const currentId = data.id || data._id;

        if (target.classList.contains("view-btn")) {
          navigate(`/branches/view/${currentId}`);
        } else if (target.classList.contains("edit-btn")) {
          navigate(`/branches/update/${currentId}`);
        } else if (target.classList.contains("delete-btn")) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              removeBranch(currentId);
            }
          });
        }
      },
    },
    {
      title: "ID",
      field: "id",
      width: 70,
      formatter: (cell: any) => {
        const data = cell.getRow().getData();
        return data.id || data._id || "";
      },
    },
    { title: "Name", field: "name" },
    { title: "City", field: "city" },
    { title: "Direction", field: "direction" },
    {
      title: "Is Main",
      field: "is_main",
      formatter: (cell: any) => (cell.getValue() ? "Yes" : "No"),
    },
    {
      title: "Products",
      field: "products",
      hozAlign: "center",
      width: 140,
      formatter: (cell: any) => {
        const val = cell.getValue();
        if (val && val.length > 0) {
          return `<button class="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 rounded text-xs products-btn">Products: ${val.length}</button>`;
        }
        return '<span class="text-gray-400 italic text-xs">No Products</span>';
      },
      cellClick: (e: any, cell: any) => {
        if ((e.target as HTMLElement).classList.contains("products-btn")) {
          const data = cell.getRow().getData();
          navigate("/products", {
            state: {
              branchProducts: data.products,
              branchName: data.name,
            },
          });
        }
      },
    },
    {
      title: "Workers",
      field: "workers",
      formatter: (cell: any) => {
        const workers = cell.getValue();
        if (workers && workers.length > 0) {
          return `<button class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs workers-btn">View ${workers.length}</button>`;
        }
        return '<span class="text-gray-400 italic text-xs">No Workers</span>';
      },
      cellClick: (e: any, cell: any) => {
        if ((e.target as HTMLElement).classList.contains("workers-btn")) {
          const data = cell.getRow().getData();
          navigate("/workers", {
            state: {
              filterIds: (data.workers || []).map((w: any) => w.id || w._id),
            },
          });
        }
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
        <h1 className="text-2xl font-bold">Branches</h1>
        <button
          onClick={() => navigate("/branches/create")}
          className="p-ripple orange-ripple bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Create New
          <Ripple />
        </button>
      </div>

      <div className="flex justify-center w-full px-4">
        {branches.length > 0 ? (
          <div className="w-full">
            <TableTabulatorComponent data={branches} columns={columns} />
          </div>
        ) : (
          <div className="w-screen h-screen fixed top-1/2 text-center">
            <LoaderPointsComponent />
          </div>
        )}
      </div>
    </>
  );
}
