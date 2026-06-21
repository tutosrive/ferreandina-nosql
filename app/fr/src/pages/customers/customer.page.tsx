import React, { useEffect, useState } from "react";
import TableDataPrimeComponent, {
  type DataTableObject,
} from "../../components/TablePrime";
import customerService from "../../services/customer.service";
import { useNavigate } from "react-router-dom";
import LoaderPointsComponent from "../../components/LoaderPoints.component";

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
      <div className="text-center mb-2">
        <h1>Customers</h1>
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
