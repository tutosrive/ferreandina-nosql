import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ripple } from "primereact/ripple";
import api from "../services/axios.config";

const getCachedCount = async (
  cacheKey: string,
  endpoint: string,
): Promise<number> => {
  const cachedData = sessionStorage.getItem(cacheKey);
  if (cachedData) {
    return parseInt(cachedData, 10);
  }

  try {
    const res = await api.get(endpoint);
    let serverPayload = res.data;

    if (serverPayload && serverPayload.data !== undefined) {
      serverPayload = serverPayload.data;
    }

    if (Array.isArray(serverPayload) && Array.isArray(serverPayload[0])) {
      serverPayload = serverPayload[0];
    }

    const count = Array.isArray(serverPayload) ? serverPayload.length : 0;
    sessionStorage.setItem(cacheKey, count.toString());
    return count;
  } catch (error) {
    console.error(
      `Error fetching length for cache key: ${cacheKey} from endpoint: ${endpoint}`,
      error,
    );
    return 0;
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [stats, setStats] = useState({
    branches: 0,
    products: 0,
    categories: 0,
    workers: 0,
    suppliers: 0,
    customers: 0,
  });

  const loadDashboardStats = async (forceRefresh = false) => {
    setIsLoading(true);
    if (forceRefresh) {
      sessionStorage.clear();
    }

    try {
      const [
        branchesLen,
        productsLen,
        categoriesLen,
        workersLen,
        suppliersLen,
        customersLen,
      ] = await Promise.all([
        getCachedCount("len_branches", "/branches"),
        getCachedCount("len_products", "/products"),
        getCachedCount("len_categories", "/categories"),
        getCachedCount("len_workers", "/workers"),
        getCachedCount("len_suppliers", "/suppliers"),
        getCachedCount("len_customers", "/customers"),
      ]);

      setStats({
        branches: branchesLen,
        products: productsLen,
        categories: categoriesLen,
        workers: workersLen,
        suppliers: suppliersLen,
        customers: customersLen,
      });
    } catch (err) {
      console.error("Error loading dashboard stats", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
            FerreAndina Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Centralized management of branches, inventory, and staff.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => loadDashboardStats(true)}
            className="p-ripple bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 px-4 py-2 rounded-lg text-sm flex items-center transition-colors shadow"
          >
            🔄 Force Refresh
            <Ripple />
          </button>

          <button
            onClick={() => navigate("/advanced-queries")}
            className="p-ripple bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-semibold flex items-center shadow-lg transition-all"
          >
            🚀 Advanced Queries & Reports
            <Ripple />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Branches Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
            alt="Branches"
            className="w-full h-36 object-cover border-b border-gray-700"
          />
          <div className="p-5 flex flex-col flex-grow justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-200">Branches</h3>
                <span className="bg-blue-900/50 text-blue-400 text-xs px-2.5 py-1 rounded-full font-mono border border-blue-800/60">
                  {isLoading ? "..." : `${stats.branches} records`}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Administration of physical locations, product allocation, and
                managers.
              </p>
            </div>
            <button
              onClick={() => navigate("/branches")}
              className="p-ripple w-full mt-5 bg-gray-700/50 hover:bg-gray-700 text-gray-200 py-2 rounded-lg text-sm transition-colors"
            >
              Go to Branches
              <Ripple />
            </button>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?q=80&w=800&auto=format&fit=crop"
            alt="Products"
            className="w-full h-36 object-cover border-b border-gray-700"
          />
          <div className="p-5 flex flex-col flex-grow justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-200">Products</h3>
                <span className="bg-green-900/50 text-green-400 text-xs px-2.5 py-1 rounded-full font-mono border border-green-800/60">
                  {isLoading ? "..." : `${stats.products} records`}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Global catalog of hardware items, price control, and stock.
              </p>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="p-ripple w-full mt-5 bg-gray-700/50 hover:bg-gray-700 text-gray-200 py-2 rounded-lg text-sm transition-colors"
            >
              Go to Products
              <Ripple />
            </button>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop"
            alt="Categories"
            className="w-full h-36 object-cover border-b border-gray-700"
          />
          <div className="p-5 flex flex-col flex-grow justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-200">Categories</h3>
                <span className="bg-yellow-900/50 text-yellow-400 text-xs px-2.5 py-1 rounded-full font-mono border border-yellow-800/60">
                  {isLoading ? "..." : `${stats.categories} records`}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Taxonomic classifications to optimize searches and reporting.
              </p>
            </div>
            <button
              onClick={() => navigate("/categories")}
              className="p-ripple w-full mt-5 bg-gray-700/50 hover:bg-gray-700 text-gray-200 py-2 rounded-lg text-sm transition-colors"
            >
              Go to Categories
              <Ripple />
            </button>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop"
            alt="Workers"
            className="w-full h-36 object-cover border-b border-gray-700"
          />
          <div className="p-5 flex flex-col flex-grow justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-200">Workers</h3>
                <span className="bg-purple-900/50 text-purple-400 text-xs px-2.5 py-1 rounded-full font-mono border border-purple-800/60">
                  {isLoading ? "..." : `${stats.workers} records`}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Payroll management, operational specialties, and work history.
              </p>
            </div>
            <button
              onClick={() => navigate("/workers")}
              className="p-ripple w-full mt-5 bg-gray-700/50 hover:bg-gray-700 text-gray-200 py-2 rounded-lg text-sm transition-colors"
            >
              Go to Workers
              <Ripple />
            </button>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop"
            alt="Suppliers"
            className="w-full h-36 object-cover border-b border-gray-700"
          />
          <div className="p-5 flex flex-col flex-grow justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-200">Suppliers</h3>
                <span className="bg-red-900/50 text-red-400 text-xs px-2.5 py-1 rounded-full font-mono border border-red-800/60">
                  {/* FIXED: Reading from stats.suppliers */}
                  {isLoading ? "..." : `${stats.suppliers} records`}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Management of product providers, contacts, and delivery
                tracking.
              </p>
            </div>
            <button
              // FIXED: Navigation path matches router
              onClick={() => navigate("/suppliers")}
              className="p-ripple w-full mt-5 bg-gray-700/50 hover:bg-gray-700 text-gray-200 py-2 rounded-lg text-sm transition-colors"
            >
              Go to Suppliers
              <Ripple />
            </button>
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md flex flex-col justify-between overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"
            alt="Customers"
            className="w-full h-36 object-cover border-b border-gray-700"
          />
          <div className="p-5 flex flex-col flex-grow justify-between">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-gray-200">Customers</h3>
                <span className="bg-cyan-900/50 text-cyan-400 text-xs px-2.5 py-1 rounded-full font-mono border border-cyan-800/60">
                  {isLoading ? "..." : `${stats.customers} records`}
                </span>
              </div>
              <p className="text-gray-400 text-xs mt-2">
                Record of frequent buyers and commercial categorizations.
              </p>
            </div>
            <button
              onClick={() => navigate("/customers")}
              className="p-ripple w-full mt-5 bg-gray-700/50 hover:bg-gray-700 text-gray-200 py-2 rounded-lg text-sm transition-colors"
            >
              Go to Customers
              <Ripple />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
