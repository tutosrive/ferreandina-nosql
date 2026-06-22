import { useState, useEffect } from "react";
import branchService from "../services/branch.service";
import categoryService from "../services/category.service";
import customerService from "../services/customer.service";
import productService from "../services/product.service";
import supplierService from "../services/supplier.service";
import workerService from "../services/worker.service";

export type SectionKey =
  | "branches"
  | "categories"
  | "customers"
  | "products"
  | "suppliers"
  | "workers";

export interface SummaryCard {
  id: SectionKey;
  label: string;
  count: number;
  description: string;
  emoji: string;
}

export const useDashboardData = () => {
  const [sectionData, setSectionData] = useState<Record<SectionKey, any[]>>({
    branches: [],
    categories: [],
    customers: [],
    products: [],
    suppliers: [],
    workers: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [
        branchesRes,
        categoriesRes,
        customersRes,
        productsRes,
        suppliersRes,
        workersRes,
      ] = await Promise.all([
        branchService.get_all(),
        categoryService.get_all(),
        customerService.get_all(),
        productService.get_all(),
        supplierService.get_all(),
        workerService.get_all(),
      ]);

      setSectionData({
        branches: branchesRes.data || [],
        categories: categoriesRes.data || [],
        customers: customersRes.data || [],
        products: productsRes.data || [],
        suppliers: suppliersRes.data || [],
        workers: workersRes.data || [],
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const summaryCards: SummaryCard[] = [
    {
      id: "branches",
      label: "Branches",
      count: sectionData.branches.length,
      description: "Sucursales activas en la red",
      emoji: "🏢",
    },
    {
      id: "categories",
      label: "Categorías",
      count: sectionData.categories.length,
      description: "Tipos de productos definidos",
      emoji: "🗂️",
    },
    {
      id: "customers",
      label: "Customers",
      count: sectionData.customers.length,
      description: "Clientes registrados",
      emoji: "👥",
    },
    {
      id: "products",
      label: "Productos",
      count: sectionData.products.length,
      description: "Items disponibles en inventario",
      emoji: "📦",
    },
    {
      id: "suppliers",
      label: "Suppliers",
      count: sectionData.suppliers.length,
      description: "Proveedores activos",
      emoji: "🚚",
    },
    {
      id: "workers",
      label: "Workers",
      count: sectionData.workers.length,
      description: "Empleados registrados",
      emoji: "🛠️",
    },
  ];

  return { sectionData, summaryCards, isLoading, refreshData: fetchAllData };
};
