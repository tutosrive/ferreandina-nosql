import React from "react";
import SupplierFormComponent from "../../components/suppliers/supplierForm.component";

export default function CreateSupplierPage() {
  return (
    <div className="pb-10">
      <h2 className="text-xl font-bold text-center mb-6">
        Create New Supplier
      </h2>
      <SupplierFormComponent isEdit={false} />
    </div>
  );
}
