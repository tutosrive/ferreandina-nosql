import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import branchService from "../../services/branch.service";
import productService from "../../services/product.service";
import workerService from "../../services/worker.service";
import BranchFormComponent from "../../components/branches/branchForm.component";
import LoaderPointsComponent from "../../components/LoaderPoints.component";
import Swal from "sweetalert2";
import { Ripple } from "primereact/ripple";

export default function UpdateBranchPage() {
  const { id } = useParams();
  const [isAssigning, setIsAssigning] = useState(false);
  const [isAssigningWorker, setIsAssigningWorker] = useState(false);
  const [branch, setBranch] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [allWorkers, setAllWorkers] = useState<any[]>([]);
  const [allBranches, setAllBranches] = useState<any[]>([]);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [assignQuantity, setAssignQuantity] = useState("");
  const [selectedWorkerId, setSelectedWorkerId] = useState("");

  const fetchData = async () => {
    if (id) {
      const resBranch = await branchService.get_by_id(id);
      setBranch(resBranch.data);
    }
    const resProds = await productService.get_all();
    setAllProducts(resProds.data || []);

    const resWorkers = await workerService.get_all();
    setAllWorkers(resWorkers.data || []);

    const resBranches = await branchService.get_all();
    setAllBranches(resBranches.data || []);
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
    setIsAssigning(true);

    const prodId = Number(selectedProductId);
    const qty = Number(assignQuantity);
    const selectedProd = allProducts.find((p) => (p._id || p.id) === prodId);

    if (!selectedProd) {
      Swal.fire("Error", "Product not found", "error");
      setIsAssigning(false);
      return;
    }

    const cleanProductsMap = new Map<number, any>();

    (branch.products || []).forEach((p: any) => {
      const pId = Number(p._id || p.id);
      if (pId) {
        if (cleanProductsMap.has(pId)) {
          cleanProductsMap.get(pId).quantity += Number(p.quantity);
        } else {
          cleanProductsMap.set(pId, {
            _id: pId,
            name: p.name,
            quantity: Number(p.quantity),
            image: p.image || "",
          });
        }
      }
    });

    if (cleanProductsMap.has(prodId)) {
      cleanProductsMap.get(prodId).quantity += qty;
    } else {
      cleanProductsMap.set(prodId, {
        _id: prodId,
        name: selectedProd.name,
        quantity: qty,
        image: selectedProd.image || "",
      });
    }

    const updatedBranch = {
      ...branch,
      products: Array.from(cleanProductsMap.values()),
    };
    const res = await branchService.update(
      branch._id || branch.id,
      updatedBranch,
    );

    if (res.status === 200 || res.status === 201) {
      Swal.fire({
        title: "Success",
        text: "Product stock updated cleanly!",
        icon: "success",
        timer: 1500,
      });
      setSelectedProductId("");
      setAssignQuantity("");
      fetchData();
    } else {
      Swal.fire("Error", "Could not assign product", "error");
    }
    setIsAssigning(false);
  };

  const handleAssignWorker = async () => {
    if (!selectedWorkerId) {
      Swal.fire("Warning", "Please select a worker", "warning");
      return;
    }
    setIsAssigningWorker(true);

    const workerId = Number(selectedWorkerId);

    const assignedBranch = allBranches.find(
      (b) =>
        (b._id || b.id) !== (branch._id || branch.id) &&
        b.workers?.some((w: any) => Number(w._id || w.id) === workerId),
    );

    if (assignedBranch) {
      Swal.fire(
        "Action Denied",
        `This worker is already assigned to branch: "${assignedBranch.name}"`,
        "error",
      );
      setIsAssigningWorker(false);
      return;
    }

    const selectedWorker = allWorkers.find(
      (w) => Number(w._id || w.id) === workerId,
    );
    if (!selectedWorker) {
      Swal.fire("Error", "Worker not found", "error");
      setIsAssigningWorker(false);
      return;
    }

    const cleanWorkersMap = new Map<number, any>();

    (branch.workers || []).forEach((w: any) => {
      const wId = Number(w._id || w.id);
      if (wId) {
        cleanWorkersMap.set(wId, {
          _id: wId,
          name: w.name,
          image: w.image || "",
        });
      }
    });

    cleanWorkersMap.set(workerId, {
      _id: workerId,
      name: selectedWorker.name,
      image: selectedWorker.image || "",
    });

    const updatedBranch = {
      ...branch,
      workers: Array.from(cleanWorkersMap.values()),
    };

    const res = await branchService.update(
      branch._id || branch.id,
      updatedBranch,
    );

    if (res.status === 200 || res.status === 201) {
      Swal.fire(
        "Success",
        "Worker assigned and duplicates cleaned!",
        "success",
      );
      setSelectedWorkerId("");
      fetchData();
    } else {
      Swal.fire("Error", "Could not assign worker", "error");
    }
    setIsAssigningWorker(false);
  };

  if (!branch) return <LoaderPointsComponent />;

  return (
    <div className="pb-10">
      <h2 className="text-xl font-bold text-center mb-6">
        Update Branch Details
      </h2>
      <BranchFormComponent initialData={branch} isEdit={true} />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-yellow-500 mb-4">
              Assign / Update Stock
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Select Product
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full border border-gray-600 px-3 py-2 rounded text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">-- Choose a product --</option>
                  {allProducts.map((p) => (
                    <option key={p._id || p.id} value={p._id || p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Quantity in this Branch
                </label>
                <input
                  type="number"
                  value={assignQuantity}
                  onChange={(e) =>
                    setAssignQuantity(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="e.g. 1500"
                  className="w-full border border-gray-600 px-3 py-2 rounded text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAssignProduct}
            disabled={isAssigning}
            className={`p-ripple text-white font-medium px-4 py-2 rounded transition-colors w-full sm:w-auto self-start mt-6 ${
              isAssigning
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isAssigning ? "Assigning..." : "Assign Product Stock"}
            <Ripple />
          </button>
        </div>

        {/* Panel de Asignación de Workers */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-md flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-green-500 mb-4">
              Assign Worker
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Select Worker
                </label>
                <select
                  value={selectedWorkerId}
                  onChange={(e) => setSelectedWorkerId(e.target.value)}
                  className="w-full border border-gray-600 px-3 py-2 rounded text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">-- Choose a worker --</option>
                  {allWorkers.map((w) => {
                    const isBusy = allBranches.some((b) =>
                      b.workers?.some(
                        (bw: any) =>
                          Number(bw._id || bw.id) === Number(w._id || w.id),
                      ),
                    );
                    return (
                      <option key={w._id || w.id} value={w._id || w.id}>
                        {w.name} {isBusy ? "(Assigned)" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
              <p className="text-xs text-gray-400 italic mt-2">
                * Note: A worker can only be linked to a single branch.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAssignWorker}
            disabled={isAssigningWorker}
            className={`p-ripple text-white font-medium px-4 py-2 rounded transition-colors w-full sm:w-auto self-start mt-6 ${
              isAssigningWorker
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isAssigningWorker ? "Assigning..." : "Assign Worker"}
            <Ripple />
          </button>
        </div>
      </div>
    </div>
  );
}
