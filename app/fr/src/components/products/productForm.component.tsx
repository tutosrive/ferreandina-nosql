import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import productService from "../../services/product.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ripple } from "primereact/ripple";
import type Product from "../../models/Product.model";

interface ProductFormProps {
  initialData?: any | null; // Usamos 'any' temporalmente aquí para atrapar variaciones del backend
  isEdit?: boolean;
  isView?: boolean;
}

export default function ProductFormComponent({
  initialData = null,
  isEdit = false,
  isView = false,
}: ProductFormProps) {
  const navigate = useNavigate();

  // Mapeo a prueba de balas: revisa snake_case, camelCase y objetos anidados
  const initialValues = {
    id: initialData?.id || initialData?._id || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    category_id: initialData?.category_id || initialData?.categoryId || "",
    supplier_id:
      initialData?.supplier?._id ||
      initialData?.supplier?.id ||
      initialData?.supplier_id ||
      initialData?.supplierId ||
      "",
    supplier_name:
      initialData?.supplier?.name ||
      initialData?.supplier_name ||
      initialData?.supplierName ||
      "",

    quantity: initialData?.quantity || "",
    unitary_weight:
      initialData?.unitary_weight || initialData?.unitaryWeight || "",
    sould_out_date:
      initialData?.sould_out_date || initialData?.souldOutDate || "",
    image: initialData?.image || "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const validationSchema = Yup.object({
    id: Yup.number().typeError("ID must be a number").required("Required ID"),
    name: Yup.string().required("Required Name"),
    description: Yup.string().required("Required Description"),
    price: Yup.number()
      .typeError("Must be a number")
      .required("Required Price"),
    category_id: Yup.number()
      .typeError("Must be a number")
      .required("Required Category ID"),
    quantity: Yup.number()
      .typeError("Must be a number")
      .required("Required Quantity"),
    unitary_weight: Yup.number()
      .typeError("Must be a number")
      .required("Required Unitary Weight"),
    sould_out_date: Yup.string().nullable(),
    supplier_id: Yup.number()
      .typeError("Must be a number")
      .required("Required Supplier ID"),
    supplier_name: Yup.string().required("Required Supplier Name"),
    image: Yup.string().url("Must be a valid URL").nullable(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    if (isView) return;

    const payload: Product = {
      id: Number(values.id),
      name: values.name,
      description: values.description,
      price: Number(values.price),
      category_id: Number(values.category_id),
      quantity: Number(values.quantity),
      unitary_weight: Number(values.unitary_weight),
      sould_out_date: values.sould_out_date,
      supplier: {
        id: Number(values.supplier_id),
        name: values.supplier_name,
      },
      image: values.image,
    };

    const response = isEdit
      ? await productService.update_product(payload.id as number, payload)
      : await productService.post_product(payload);

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: "Success",
        text: `Product successfully processed`,
        icon: "success",
      });
      navigate("/products");
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to process product",
        icon: "error",
      });
    }
  };

  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setFormValues(values);
      handleSubmit(values);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (["id", "category_id", "quantity", "supplier_id"].includes(name)) {
      value = value.replace(/\D/g, "");
    }

    setFormValues((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value);
  };

  const fields = [
    { name: "id", type: "text", label: "ID" },
    { name: "name", type: "text", label: "NAME" },
    { name: "description", type: "text", label: "DESCRIPTION" },
    { name: "price", type: "number", label: "PRICE" },
    { name: "category_id", type: "text", label: "CATEGORY ID" },
    { name: "quantity", type: "text", label: "QUANTITY" },
    { name: "unitary_weight", type: "number", label: "UNITARY WEIGHT" },
    { name: "sould_out_date", type: "date", label: "SOLD OUT DATE" },
    { name: "supplier_id", type: "text", label: "SUPPLIER ID" },
    { name: "supplier_name", type: "text", label: "SUPPLIER NAME" },
    { name: "image", type: "text", label: "IMAGE URL" },
  ];

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {fields.map((field) => {
          const isDisabled = isView || (isEdit && field.name === "id");

          return (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                step={field.type === "number" ? "0.01" : undefined}
                placeholder={field.label}
                value={
                  (formik.values[
                    field.name as keyof typeof formik.values
                  ] as string) || ""
                }
                onChange={handleChange}
                disabled={isDisabled}
                className={`w-full border px-3 py-2 rounded text-black placeholder-gray-300 ${
                  isDisabled
                    ? "bg-gray-200 cursor-not-allowed font-semibold"
                    : "bg-white"
                }`}
              />
              {!isDisabled &&
                formik.touched[field.name as keyof typeof formik.touched] &&
                formik.errors[field.name as keyof typeof formik.errors] && (
                  <div className="text-red-500 text-sm mt-1">
                    {
                      formik.errors[
                        field.name as keyof typeof formik.errors
                      ] as string
                    }
                  </div>
                )}
            </div>
          );
        })}

        <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-2 sm:space-y-0 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-ripple orange-ripple bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Back
            <Ripple />
          </button>

          {!isView && (
            <button
              type="submit"
              className="p-ripple orange-ripple bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              {isEdit ? "Update" : "Create"}
              <Ripple />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
