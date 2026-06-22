import React, { useEffect, useState } from "react";
import supplierService from "../../services/supplier.service";
import { useNavigate } from "react-router-dom";
import LoaderPointsComponent from "../../components/LoaderPoints.component";
import TableTabulatorComponent from "../../components/TableTabulator.component";
import { Ripple } from "primereact/ripple";
import Swal from "sweetalert2";

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getSuppliers = async () => {
    setIsLoading(true);
    const res = await supplierService.get_all();
    setSuppliers(res.data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  const removeSupplier = async (id: string | number) => {
    await supplierService.delete(Number(id));
    await getSuppliers();
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
          navigate(`/suppliers/view/${currentId}`);
        } else if (target.classList.contains("edit-btn")) {
          navigate(`/suppliers/update/${currentId}`);
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
            if (result.isConfirmed) removeSupplier(currentId);
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
          ? `<img src="${value}" alt="Supplier" class="w-10 h-10 object-cover rounded border shadow-sm mx-auto" />`
          : `<span class="text-gray-400 italic text-xs">No image</span>`;
      },
    },
    { title: "Name", field: "name", width: 220 },
    { title: "Phone", field: "phone", width: 140 },
    { title: "Email", field: "email" },
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

        <h1 className="text-2xl font-bold">Suppliers</h1>

        <button
          onClick={() => navigate("/suppliers/create")}
          className="p-ripple orange-ripple bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Create New
          <Ripple />
        </button>
      </div>

      <div className="flex justify-center w-full px-4">
        {isLoading ? (
          <div className="w-full flex justify-center mt-20">
            <LoaderPointsComponent />
          </div>
        ) : (
          <div className="w-full">
            <TableTabulatorComponent data={suppliers} columns={columns} />
          </div>
        )}
      </div>
    </>
  );
}
