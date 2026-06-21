import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customerService from "../../services/customer.service";
import CustomerFormComponent from "../../components/customers/customerForm.component";
import LoaderPointsComponent from "../../components/LoaderPoints.component";

export default function ViewCustomerPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        const res = await customerService.get_customer_by_id(id);
        setCustomer(res.data);
      }
    };
    fetchCustomer();
  }, [id]);

  if (!customer) return <LoaderPointsComponent />;

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-6">
        View Customer Details
      </h2>
      <CustomerFormComponent initialData={customer} isView={true} />
    </div>
  );
}
