import { lazy } from "react";

const HomePage = lazy(() => import("../pages/home.page"));

const CustomersPage = lazy(() => import("../pages/customers/customer.page"));
const CreateCustomerPage = lazy(
  () => import("../pages/customers/createCustomer.page"),
);
const UpdateCustomerPage = lazy(
  () => import("../pages/customers/updateCustomer.page"),
);
const ViewCustomerPage = lazy(
  () => import("../pages/customers/viewCustomer.page"),
);

const BranchesPage = lazy(() => import("../pages/branches/branch.page"));
const CreateBranchPage = lazy(
  () => import("../pages/branches/createBranch.page"),
);
const UpdateBranchPage = lazy(
  () => import("../pages/branches/updateBranch.page"),
);
const ViewBranchPage = lazy(() => import("../pages/branches/viewBranch.page"));

const CategoriesPage = lazy(() => import("../pages/categories/category.page"));
const CreateCategoryPage = lazy(
  () => import("../pages/categories/createCategory.page"),
);
const UpdateCategoryPage = lazy(
  () => import("../pages/categories/updateCategory.page"),
);
const ViewCategoryPage = lazy(
  () => import("../pages/categories/viewCategory.page"),
);

const ProductsPage = lazy(() => import("../pages/products/product.page"));
const CreateProductPage = lazy(
  () => import("../pages/products/createProduct.page"),
);
const UpdateProductPage = lazy(
  () => import("../pages/products/updateProduct.page"),
);
const ViewProductPage = lazy(
  () => import("../pages/products/viewProduct.page"),
);

const SuppliersPage = lazy(() => import("../pages/suppliers/supplier.page"));
const CreateSupplierPage = lazy(
  () => import("../pages/suppliers/createSupplier.page"),
);
const UpdateSupplierPage = lazy(
  () => import("../pages/suppliers/updateSupplier.page"),
);
const ViewSupplierPage = lazy(
  () => import("../pages/suppliers/viewSupplier.page"),
);

const WorkersPage = lazy(() => import("../pages/workers/worker.page"));
const CreateWorkerPage = lazy(
  () => import("../pages/workers/createWorker.page"),
);
const UpdateWorkerPage = lazy(
  () => import("../pages/workers/updateWorker.page"),
);
const ViewWorkerPage = lazy(() => import("../pages/workers/viewWorker.page"));

const routers = [
  { path: "/", element: <HomePage />, title: "Inicio" },

  { path: "/customers", element: <CustomersPage />, title: "Customers" },
  {
    path: "/customers/create",
    element: <CreateCustomerPage />,
    title: "Create Customer",
  },
  {
    path: "/customers/update/:id",
    element: <UpdateCustomerPage />,
    title: "Update Customer",
  },
  {
    path: "/customers/view/:id",
    element: <ViewCustomerPage />,
    title: "View Customer",
  },

  { path: "/branches", element: <BranchesPage />, title: "Branches" },
  {
    path: "/branches/create",
    element: <CreateBranchPage />,
    title: "Create Branch",
  },
  {
    path: "/branches/update/:id",
    element: <UpdateBranchPage />,
    title: "Update Branch",
  },
  {
    path: "/branches/view/:id",
    element: <ViewBranchPage />,
    title: "View Branch",
  },

  { path: "/categories", element: <CategoriesPage />, title: "Categories" },
  {
    path: "/categories/create",
    element: <CreateCategoryPage />,
    title: "Create Category",
  },
  {
    path: "/categories/update/:id",
    element: <UpdateCategoryPage />,
    title: "Update Category",
  },
  {
    path: "/categories/view/:id",
    element: <ViewCategoryPage />,
    title: "View Category",
  },

  { path: "/products", element: <ProductsPage />, title: "Products" },
  {
    path: "/products/create",
    element: <CreateProductPage />,
    title: "Create Product",
  },
  {
    path: "/products/update/:id",
    element: <UpdateProductPage />,
    title: "Update Product",
  },
  {
    path: "/products/view/:id",
    element: <ViewProductPage />,
    title: "View Product",
  },

  { path: "/suppliers", element: <SuppliersPage />, title: "Suppliers" },
  {
    path: "/suppliers/create",
    element: <CreateSupplierPage />,
    title: "Create Supplier",
  },
  {
    path: "/suppliers/update/:id",
    element: <UpdateSupplierPage />,
    title: "Update Supplier",
  },
  {
    path: "/suppliers/view/:id",
    element: <ViewSupplierPage />,
    title: "View Supplier",
  },

  { path: "/workers", element: <WorkersPage />, title: "Workers" },
  {
    path: "/workers/create",
    element: <CreateWorkerPage />,
    title: "Create Worker",
  },
  {
    path: "/workers/update/:id",
    element: <UpdateWorkerPage />,
    title: "Update Worker",
  },
  {
    path: "/workers/view/:id",
    element: <ViewWorkerPage />,
    title: "View Worker",
  },
];

export default routers;
