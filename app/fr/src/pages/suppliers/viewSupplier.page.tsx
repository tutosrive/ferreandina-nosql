import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supplierService from "../../services/supplier.service";
import SupplierFormComponent from "../../components/suppliers/supplierForm.component";
import LoaderPointsComponent from "../../components/LoaderPoints.component";

export default function ViewSupplierPage() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    const fetchSupplier = async () => {
      if (id) {
        const res = await supplierService.get_by_id(id);
        setSupplier(res.data);
      }
    };
    fetchSupplier();
  }, [id]);

  if (!supplier) return <LoaderPointsComponent />;

  return (
    <div className="pb-10">
      <h2 className="text-xl font-bold text-center mb-6">
        View Supplier Details
      </h2>
      <SupplierFormComponent initialData={supplier} isView={true} />
    </div>
  );
}
