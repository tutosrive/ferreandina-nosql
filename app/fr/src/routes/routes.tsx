import { lazy } from "react";

const HomePage = lazy(() => import("../pages/home.page"));
const SectionPage = lazy(() => import("../pages/section.page"));
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

const routers = [
  { path: "/", element: <HomePage />, title: "Inicio" },
  {
    path: "/branches",
    element: <SectionPage section="branches" />,
    title: "Sucursales",
  },
  {
    path: "/categories",
    element: <SectionPage section="categories" />,
    title: "Categorías",
  },
  {
    path: "/products",
    element: <SectionPage section="products" />,
    title: "Productos",
  },
  {
    path: "/suppliers",
    element: <SectionPage section="suppliers" />,
    title: "Proveedores",
  },
  {
    path: "/workers",
    element: <SectionPage section="workers" />,
    title: "Trabajadores",
  },
  {
    path: "/customers",
    element: <CustomersPage />,
    title: "Customers List",
  },
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
];

export default routers;
