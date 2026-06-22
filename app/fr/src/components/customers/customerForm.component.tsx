import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import customerService from "../../services/customer.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ripple } from "primereact/ripple";
import type Customer from "../../models/Customer.model";

interface CustomerFormProps {
  initialData?: Customer | null;
  isEdit?: boolean;
  isView?: boolean;
}

export default function CustomerFormComponent({
  initialData = null,
  isEdit = false,
  isView = false,
}: CustomerFormProps) {
  const navigate = useNavigate();

  const initialValues = {
    id: initialData?.id || (initialData as any)?._id || "",
    alias: initialData?.alias || "",
    ni: initialData?.ni || "",
    category: initialData?.category || "",
    phone: initialData?.phone || "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const validationSchema = Yup.object({
    id: Yup.number()
      .typeError("ID must be a number")
      .integer("ID must be an integer")
      .required("Required ID"),
    alias: Yup.string().min(3, "Minimum 3 chars").required("Required Alias"),
    ni: Yup.string().required("Required NI"),
    category: Yup.string().required("Required Category"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only numbers")
      .required("Required Phone"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    if (isView) return;

    const payload: Customer = {
      id: Number(values.id),
      alias: values.alias,
      ni: values.ni,
      category: values.category,
      phone: values.phone,
    };

    const response = isEdit
      ? await customerService.update(payload.id as number, payload)
      : await customerService.post(payload);

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: "Success",
        text: `Customer successfully ${isEdit ? "updated" : "created"}`,
        icon: "success",
      });
      navigate("/customers");
    } else {
      Swal.fire("Error", "Failed to process customer", "error");
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
    if (["id", "phone"].includes(name)) {
      value = value.replace(/\D/g, "");
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value);
  };

  const fields = [
    { name: "id", type: "text", label: "ID" },
    { name: "alias", type: "text", label: "ALIAS" },
    { name: "ni", type: "text", label: "NI (Document/Tax ID)" },
    { name: "category", type: "text", label: "CATEGORY" },
    { name: "phone", type: "text", label: "PHONE" },
  ];

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {fields.map((field) => {
          const isDisabled = isView || (isEdit && field.name === "id");

          return (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                value={
                  formik.values[field.name as keyof typeof formik.values] || ""
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
            className="p-ripple bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Back
            <Ripple />
          </button>

          {!isView && (
            <button
              type="submit"
              className="p-ripple bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              {isEdit ? "Update Customer" : "Create Customer"}
              <Ripple />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
