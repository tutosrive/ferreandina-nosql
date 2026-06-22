import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import branchService from "../../services/branch.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ripple } from "primereact/ripple";
import type Branch from "../../models/Branch.model";

interface BranchFormProps {
  initialData?: Branch | null;
  isEdit?: boolean;
  isView?: boolean;
}

export default function BranchFormComponent({
  initialData = null,
  isEdit = false,
  isView = false,
}: BranchFormProps) {
  const navigate = useNavigate();

  const initialValues = {
    id: initialData?.id || "",
    name: initialData?.name || "",
    city: initialData?.city || "",
    direction: initialData?.direction || "",
    is_main: initialData?.is_main || false,
  };

  const [formValues, setFormValues] = useState(initialValues);

  const validationSchema = Yup.object({
    id: Yup.number().typeError("ID must be a number").required("Required ID"),
    name: Yup.string().required("Required Name"),
    city: Yup.string().required("Required City"),
    direction: Yup.string().required("Required Direction"),
    is_main: Yup.boolean(),
  });

  const handleSubmit = async (values: any) => {
    if (isView) return;

    const payload: Branch = {
      id: Number(values.id),
      name: values.name,
      city: values.city,
      direction: values.direction,
      is_main: Boolean(values.is_main),
    };

    const response = isEdit
      ? await branchService.update_branch(payload.id as number, payload)
      : await branchService.post_branch(payload);

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: "Success",
        text: `Branch successfully processed`,
        icon: "success",
      });
      navigate("/branches");
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to process branch",
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
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    let finalValue = value;
    if (name === "id") {
      finalValue = String(value).replace(/\D/g, "");
    }

    setFormValues((prev) => ({ ...prev, [name]: finalValue }));
    formik.setFieldValue(name, finalValue);
  };

  const fields = [
    { name: "id", type: "text", label: "ID" },
    { name: "name", type: "text", label: "NAME" },
    { name: "city", type: "text", label: "CITY" },
    { name: "direction", type: "text", label: "DIRECTION" },
  ];

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {fields.map((field) => {
          const isDisabled = isView || (isEdit && field.name === "id");

          return (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.label}
                value={
                  (formik.values[
                    field.name as keyof typeof formik.values
                  ] as string) || ""
                }
                onChange={handleChange}
                disabled={isDisabled}
                className={`w-full border px-3 py-2 rounded text-gray-700 ${isDisabled ? "bg-gray-100 cursor-not-allowed font-semibold" : ""}`}
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

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            name="is_main"
            id="is_main"
            checked={formik.values.is_main}
            onChange={handleChange}
            disabled={isView}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="is_main"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            IS MAIN BRANCH
          </label>
        </div>

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
