import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import categoryService from "../../services/category.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ripple } from "primereact/ripple";

interface CategoryFormProps {
  initialData?: any | null;
  isEdit?: boolean;
  isView?: boolean;
}

export default function CategoryFormComponent({
  initialData = null,
  isEdit = false,
  isView = false,
}: CategoryFormProps) {
  const navigate = useNavigate();

  const initialValues = {
    id: initialData?.id || initialData?._id || "",
    name: initialData?.name || "",
    description: initialData?.description || "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const validationSchema = Yup.object({
    id: Yup.number()
      .typeError("ID must be a number")
      .integer("ID must be an integer")
      .required("Required ID"),
    name: Yup.string().min(3, "Minimum 3 chars").required("Required Name"),
    description: Yup.string()
      .min(10, "Minimum 10 chars")
      .required("Required Description"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    if (isView) return;

    const payload = {
      id: Number(values.id),
      name: values.name,
      description: values.description,
    };

    const response = isEdit
      ? await categoryService.update(payload.id, payload)
      : await categoryService.post(payload);

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: "Success",
        text: `Category successfully ${isEdit ? "updated" : "created"}`,
        icon: "success",
      });
      navigate("/categories");
    } else {
      Swal.fire("Error", "Failed to process category", "error");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let { name, value } = e.target;
    if (name === "id") {
      value = value.replace(/\D/g, "");
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* ID Field */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            ID
          </label>
          <input
            type="text"
            name="id"
            placeholder="Category ID"
            value={formik.values.id}
            onChange={handleChange}
            disabled={isView || isEdit}
            className={`w-full border px-3 py-2 rounded text-black placeholder-gray-300 ${
              isView || isEdit
                ? "bg-gray-200 cursor-not-allowed font-semibold"
                : "bg-white"
            }`}
          />
          {!(isView || isEdit) && formik.touched.id && formik.errors.id && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.id}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            NAME
          </label>
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            value={formik.values.name}
            onChange={handleChange}
            disabled={isView}
            className={`w-full border px-3 py-2 rounded text-black placeholder-gray-300 ${
              isView
                ? "bg-gray-200 cursor-not-allowed font-semibold"
                : "bg-white"
            }`}
          />
          {!isView && formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            DESCRIPTION
          </label>
          <textarea
            name="description"
            placeholder="Category Description"
            rows={4}
            value={formik.values.description}
            onChange={handleChange}
            disabled={isView}
            className={`w-full border px-3 py-2 rounded text-black placeholder-gray-300 resize-none ${
              isView
                ? "bg-gray-200 cursor-not-allowed font-semibold"
                : "bg-white"
            }`}
          />
          {!isView &&
            formik.touched.description &&
            formik.errors.description && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </div>
            )}
        </div>

        {/* Form Actions */}
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
              className="p-ripple orange-ripple bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              {isEdit ? "Update Category" : "Create Category"}
              <Ripple />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
