import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import workerService from "../../services/worker.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ripple } from "primereact/ripple";

interface WorkerFormProps {
  initialData?: any | null;
  isEdit?: boolean;
  isView?: boolean;
}

export default function WorkerFormComponent({
  initialData = null,
  isEdit = false,
  isView = false,
}: WorkerFormProps) {
  const navigate = useNavigate();

  const initialValues = {
    id: initialData?.id || initialData?._id || "",
    image: initialData?.image || "",
    name: initialData?.name || "",
    age: initialData?.age || "",
    speciality: initialData?.speciality || "",
    weight: initialData?.weight || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    salary: initialData?.salary || "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const validationSchema = Yup.object({
    id: Yup.number()
      .typeError("ID must be a number")
      .integer("ID must be an integer")
      .required("Required ID"),
    image: Yup.string()
      .url("Invalid URL format")
      .required("Required Image URL"),
    name: Yup.string().min(3, "Minimum 3 chars").required("Required Name"),
    age: Yup.number()
      .typeError("Age must be a number")
      .integer("Age must be an integer")
      .min(18, "Must be at least 18 years old")
      .required("Required Age"),
    speciality: Yup.string().required("Required Speciality"),
    weight: Yup.number()
      .typeError("Weight must be a number")
      .required("Required Weight"),
    email: Yup.string()
      .email("Invalid email layout")
      .required("Required Email"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Must be only numbers")
      .required("Required Phone"),
    salary: Yup.number()
      .typeError("Salary must be a number")
      .min(0)
      .required("Required Salary"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    if (isView) return;

    const payload = {
      id: Number(values.id),
      image: values.image,
      name: values.name,
      age: Number(values.age),
      speciality: values.speciality,
      weight: Number(values.weight),
      email: values.email,
      phone: values.phone,
      salary: Number(values.salary),
    };

    const response = isEdit
      ? await workerService.update(payload.id, payload)
      : await workerService.post(payload);

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: "Success",
        text: `Worker successfully ${isEdit ? "updated" : "created"}`,
        icon: "success",
      });
      navigate("/workers");
    } else {
      Swal.fire("Error", "Failed to process worker", "error");
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
    if (["id", "phone", "age", "weight", "salary"].includes(name)) {
      value = value.replace(/\D/g, "");
    }
    setFormValues((prev) => ({ ...prev, [name]: value }));
    formik.setFieldValue(name, value);
  };

  const fields = [
    { name: "id", type: "text", label: "ID" },
    { name: "image", type: "text", label: "IMAGE URL" },
    { name: "name", type: "text", label: "FULL NAME" },
    { name: "age", type: "text", label: "AGE" },
    { name: "speciality", type: "text", label: "SPECIALITY" },
    { name: "weight", type: "text", label: "WEIGHT" },
    { name: "email", type: "email", label: "EMAIL" },
    { name: "phone", type: "text", label: "PHONE" },
    { name: "salary", type: "text", label: "SALARY" },
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
              {isEdit ? "Update Worker" : "Create Worker"}
              <Ripple />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
