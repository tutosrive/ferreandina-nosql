import React, { useEffect, useState } from "react";
import productService from "../../services/product.service";
import { useLocation, useNavigate } from "react-router-dom";
import LoaderPointsComponent from "../../components/LoaderPoints.component";
import TableTabulatorComponent from "../../components/TableTabulator.component";
import { Ripple } from "primereact/ripple";
import Swal from "sweetalert2";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const filterIds = location.state?.filterIds as number[] | undefined;

  const getProducts = async () => {
    const res = await productService.get_all();
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

    const mappedData = data.map((item: any) => ({
      ...item,
      supplier_name: item.supplier ? item.supplier.name : "N/A",
    }));

    setProducts(mappedData);
  };

  useEffect(() => {
    getProducts();
  }, [filterIds]);

  const removeProduct = async (id: string | number) => {
    await productService.delete(Number(id));
    await getProducts();
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

        if (target.classList.contains("view-btn")) {
          navigate(`/products/view/${data.id}`);
        } else if (target.classList.contains("edit-btn")) {
          navigate(`/products/update/${data.id}`);
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
            if (result.isConfirmed) removeProduct(data.id);
          });
        }
      },
    },
    { title: "ID", field: "id", width: 70 },
    {
      title: "Image",
      field: "image",
      hozAlign: "center",
      formatter: (cell: any) => {
        const url = cell.getValue();
        if (url) {
          return `<img src="${url}" alt="product" class="w-10 h-10 object-cover rounded shadow-sm border" />`;
        }
        return '<span class="text-gray-400 italic text-xs">No Image</span>';
      },
    },
    { title: "Name", field: "name" },
    {
      title: "Price",
      field: "price",
      // Tabulator ya tiene formateador de dinero por defecto
      formatter: "money",
      formatterParams: { symbol: "$", precision: 2 },
    },
    { title: "Qty", field: "quantity", width: 80 },
    { title: "Category ID", field: "category_id", width: 100 },
    { title: "Supplier", field: "supplier_name" },
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
          <h1 className="text-2xl font-bold">Products</h1>
          {filterIds && (
            <span className="text-sm text-yellow-500">(Filtered View)</span>
          )}
        </div>

        <div className="flex gap-2">
          {filterIds && (
            <button
              onClick={() => navigate("/products", { state: {} })}
              className="p-ripple bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
            >
              Clear Filter
              <Ripple />
            </button>
          )}
          <button
            onClick={() => navigate("/products/create")}
            className="p-ripple orange-ripple bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Create New
            <Ripple />
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full px-4">
        {products.length > 0 ? (
          <div className="w-full">
            <TableTabulatorComponent data={products} columns={columns} />
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
