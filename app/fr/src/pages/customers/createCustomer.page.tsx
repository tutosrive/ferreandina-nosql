import CustomerFormComponent from "../../components/customers/customerForm.component";

export default function CreateCustomerPage() {
  return (
    <div className="pb-10">
      <h2 className="text-xl font-bold text-center mb-6">
        Create New Customer
      </h2>
      <CustomerFormComponent isEdit={false} />
    </div>
  );
}
