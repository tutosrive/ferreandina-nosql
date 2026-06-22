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

  const initialValues = initialData || {
    id: "",
    alias: "",
    ni: "",
    category: "",
    phone: "",
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
      .matches(/^[0-9]+$/, "Only numbers")
      .min(7, "Minimum 7 digits")
      .max(15, "Maximum 15 digits")
      .required("Required Phone"),
  });

  const handleSubmit = async (values: any) => {
    if (isView) return;

    const payload = { ...values, id: Number(values.id) };

    const response = isEdit
      ? await customerService.update_customer(payload.id, payload)
      : await customerService.post_customer(payload);

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: "Success",
        text: `Customer ${isEdit ? "updated" : "created"} successfully`,
        icon: "success",
      });
      navigate("/customers");
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to process customer",
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

    if (name === "phone" || name === "id") {
      value = value.replace(/\D/g, "");
    }

    setFormValues((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value);
  };

  const fields = ["id", "alias", "ni", "category", "phone"];

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {fields.map((field: string) => {
          const isDisabled = isView || (isEdit && field === "id");

          return (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.toUpperCase()}
              </label>
              <input
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formik.values[field as keyof typeof formik.values] || ""}
                onChange={handleChange}
                disabled={isDisabled}
                className={`w-full border px-3 py-2 rounded text-gray-700 ${isDisabled ? "bg-gray-100 cursor-not-allowed font-semibold" : ""}`}
              />
              {!isDisabled &&
                formik.touched[field as keyof typeof formik.touched] &&
                formik.errors[field as keyof typeof formik.errors] && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors[field as keyof typeof formik.errors]}
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
