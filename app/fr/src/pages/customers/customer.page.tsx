import React, { useEffect, useState } from "react";
import TableDataPrimeComponent, {
  type DataTableObject,
} from "../../components/TablePrime";
import customerService from "../../services/customer.service";
import { useNavigate } from "react-router-dom";
import LoaderPointsComponent from "../../components/LoaderPoints.component";
import { Ripple } from "primereact/ripple";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const getCustomers = async () => {
    const res = await customerService.get_all_customers();
    setCustomers(res.data || []);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const removeCustomer = async (id: string | number) => {
    await customerService.delete_customer(Number(id));
    await getCustomers();
  };

  const dataTable: DataTableObject = {
    arrayData: customers,
    headerTable: <p>Customers Management</p>,
  };

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
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="w-16"></div>
      </div>
      <div className="flex justify-center">
        {customers.length > 0 ? (
          <TableDataPrimeComponent
            data={dataTable}
            navigation={{
              navigate,
              urls: {
                create: "/customers/create",
                update: "/customers/update",
                view: "/customers/view",
              },
            }}
            onRemove={removeCustomer}
          />
        ) : (
          <div className="w-screen h-screen fixed top-1/2">
            <LoaderPointsComponent />
          </div>
        )}
      </div>
    </>
  );
}
