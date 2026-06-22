import React from "react";
import CategoryFormComponent from "../../components/categories/categoryForm.component";

export default function CreateCategoryPage() {
  return (
    <div className="pb-10">
      <h2 className="text-xl font-bold text-center mb-6">
        Create New Category
      </h2>
      <CategoryFormComponent isEdit={false} />
    </div>
  );
}
