import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import branchService from "../../services/branch.service";
import productService from "../../services/product.service";
import BranchFormComponent from "../../components/branches/branchForm.component";
import LoaderPointsComponent from "../../components/LoaderPoints.component";
import Swal from "sweetalert2";
import { Ripple } from "primereact/ripple";

export default function UpdateBranchPage() {
  const { id } = useParams();
  const [isAssigning, setIsAssigning] = useState(false);
  const [branch, setBranch] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [assignQuantity, setAssignQuantity] = useState("");

  const fetchData = async () => {
    if (id) {
      const resBranch = await branchService.get_branch_by_id(id);
      setBranch(resBranch.data);
    }
    const resProds = await productService.get_all_products();
    setAllProducts(resProds.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAssignProduct = async () => {
    if (!selectedProductId || !assignQuantity) {
      Swal.fire(
        "Warning",
        "Please select a product and enter a quantity",
        "warning",
      );
      return;
    }

    const productToAdd = allProducts.find(
      (p) => String(p.id || p._id) === selectedProductId,
    );
    if (!productToAdd) return;

    setIsAssigning(true);

    let currentProducts = (branch.products || [])
      .filter((p: any) => p.id || p._id)
      .map((p: any) => ({
        id: Number(p.id || p._id),
        name: p.name,
        quantity: Number(p.quantity),
        image: p.image,
      }));

    const selectedProductIdNum = Number(selectedProductId);

    const existingProductIndex = currentProducts.findIndex(
      (p: any) => p.id === selectedProductIdNum,
    );

    if (existingProductIndex !== -1) {
      currentProducts[existingProductIndex].quantity += Number(assignQuantity);
    } else {
      currentProducts.push({
        id: selectedProductIdNum,
        name: productToAdd.name,
        quantity: Number(assignQuantity),
        image: productToAdd.image,
      });
    }

    // Additional aggregation step to ensure no duplicates before sending to backend
    const aggregatedProductsMap = new Map<number, any>();
    currentProducts.forEach((p: any) => {
      if (aggregatedProductsMap.has(p.id)) {
        aggregatedProductsMap.get(p.id).quantity += p.quantity;
      } else {
        aggregatedProductsMap.set(p.id, { ...p });
      }
    });
    currentProducts = Array.from(aggregatedProductsMap.values());

    const payload = {
      ...branch,
      products: currentProducts,
    };

    setBranch(payload);

    const response = await branchService.update_branch(
      branch.id || branch._id,
      payload,
    );

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: "Success",
        text:
          existingProductIndex !== -1
            ? "Stock updated!"
            : "Product added to branch!",
        icon: "success",
        timer: 1500,
      });
      setSelectedProductId("");
      setAssignQuantity("");
      await fetchData();
    } else {
      Swal.fire("Error", "Failed to assign product", "error");
    }

    setIsAssigning(false);
  };

  if (!branch) return <LoaderPointsComponent />;

  return (
    <div className="pb-10">
      <h2 className="text-xl font-bold text-center mb-6">Update Branch</h2>

      <BranchFormComponent initialData={branch} isEdit={true} />

      <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-gray-50">
        <h3 className="text-lg font-bold mb-4 text-gray-700 border-b pb-2">
          📦 Assign Existing Product
        </h3>

        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Select Product
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full border px-3 py-2 rounded text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Choose a product --</option>
              {allProducts.map((p) => (
                <option key={p.id || p._id} value={p.id || p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Quantity in this Branch
            </label>
            <input
              type="number"
              value={assignQuantity}
              onChange={(e) =>
                setAssignQuantity(e.target.value.replace(/\D/g, ""))
              }
              placeholder="e.g. 1500"
              className="w-full border px-3 py-2 rounded text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleAssignProduct}
            disabled={isAssigning}
            className={`p-ripple text-white font-medium px-4 py-2 rounded transition-colors w-full sm:w-auto self-center mt-4 ${
              isAssigning
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isAssigning ? "Adding..." : "➕ Add to Branch"}
            <Ripple />
          </button>
        </div>
      </div>
    </div>
  );
}
