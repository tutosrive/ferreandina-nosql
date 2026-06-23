import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TableTabulatorComponent from "../components/TableTabulator.component";
import LoaderPointsComponent from "../components/LoaderPoints.component";
import { Ripple } from "primereact/ripple";
import Swal from "sweetalert2";
import api from "../services/axios.config";

export default function AdvancedQueriesPage() {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableColumns, setTableColumns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para los mini-formularios
  const [branchId, setBranchId] = useState("");
  const [productId, setProductId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const processAndShowTable = (json: any, isBranchProducts = false) => {
    let data = json.data || json;

    if (Array.isArray(data) && Array.isArray(data[0])) {
      data = data[0];
    }

    if (isBranchProducts) {
      if (Array.isArray(data) && data.length > 0 && data[0].products) {
        data = data[0].products;
      } else if (data.products) {
        data = data.products;
      } else {
        data = [];
      }
    }

    if (!Array.isArray(data) || data.length === 0) {
      Swal.fire("Info", "No data found for this query", "info");
      setTableData([]);
      return;
    }

    const dynamicColumns = Object.keys(data[0]).map((key) => ({
      title: key.toUpperCase().replace("_", " "),
      field: key,
      hozAlign: typeof data[0][key] === "number" ? "center" : "left",
    }));

    setTableColumns(dynamicColumns);
    setTableData(data);
    Swal.fire("Success", json.message || "Data loaded", "success");
  };

  const fetchQuery = async (endpoint: string, method = "GET") => {
    setIsLoading(true);
    try {
      const res = await api({
        url: endpoint,
        method: method,
      });

      const json = res.data;

      if (method === "PATCH" || method === "DELETE") {
        Swal.fire("Success", json.message || "Operation completed", "success");
      } else {
        processAndShowTable(
          json,
          endpoint.includes("/products") && endpoint.includes("/branches/"),
        );
      }
    } catch (error) {
      Swal.fire("Error", "Failed to communicate with backend", "error");
    }
    setIsLoading(false);
  };

  return (
    <div className="pb-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="p-ripple orange-ripple bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
          <Ripple />
        </button>
        <h1 className="text-2xl font-bold">Advanced Reports & Queries</h1>
        <div className="w-20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h3 className="font-bold text-yellow-500 mb-2">Branches Low Stock</h3>
          <p className="text-xs text-gray-400 mb-4">
            Lists products with quantity &lt; 10
          </p>
          <button
            onClick={() => fetchQuery("/branches/low-stock")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Run Query
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h3 className="font-bold text-red-400 mb-2">
            Defective Supplies Report
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Groups defective quantities by supplier
          </p>
          <button
            onClick={() => fetchQuery("/supplies/defective-report")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Run Query
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h3 className="font-bold text-green-500 mb-2">
            Clean Out Of Stock (Global)
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Removes products with qty &le; 0 from all branches
          </p>
          <button
            onClick={() => fetchQuery("/branches/clean-out-of-stock", "PATCH")}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded"
          >
            Execute Clean Up
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h3 className="font-bold text-yellow-500 mb-2">Products in Branch</h3>
          <input
            type="number"
            placeholder="Enter Branch ID"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full border border-gray-600 px-3 py-1 mb-3 rounded text-black outline-none"
          />
          <button
            onClick={() =>
              branchId
                ? fetchQuery(`/branches/${branchId}/products`)
                : Swal.fire("Warning", "Enter Branch ID", "warning")
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Run Query
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h3 className="font-bold text-yellow-500 mb-2">
            Products By Category
          </h3>
          <input
            type="number"
            placeholder="Enter Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-gray-600 px-3 py-1 mb-3 rounded text-black outline-none"
          />
          <button
            onClick={() =>
              categoryId
                ? fetchQuery(`/products/category/${categoryId}`)
                : Swal.fire("Warning", "Enter Category ID", "warning")
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Run Query
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
          <h3 className="font-bold text-red-500 mb-2">
            Remove Product from Branch
          </h3>
          <div className="flex gap-2 mb-3">
            <input
              type="number"
              placeholder="Branch ID"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="w-1/2 border border-gray-600 px-3 py-1 rounded text-black outline-none"
            />
            <input
              type="number"
              placeholder="Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-1/2 border border-gray-600 px-3 py-1 rounded text-black outline-none"
            />
          </div>
          <button
            onClick={() =>
              branchId && productId
                ? fetchQuery(
                    `/branches/${branchId}/remove-product/${productId}`,
                    "PATCH",
                  )
                : Swal.fire("Warning", "Enter both IDs", "warning")
            }
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
          >
            Remove Product
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
          Results View
        </h2>
        {isLoading ? (
          <div className="w-full flex justify-center mt-10">
            <LoaderPointsComponent />
          </div>
        ) : tableData.length > 0 ? (
          <TableTabulatorComponent data={tableData} columns={tableColumns} />
        ) : (
          <p className="text-center text-gray-500 mt-10 italic">
            Run a GET query to see results here...
          </p>
        )}
      </div>
    </div>
  );
}
