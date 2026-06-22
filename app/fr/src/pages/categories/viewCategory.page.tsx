import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import categoryService from "../../services/category.service";
import CategoryFormComponent from "../../components/categories/categoryForm.component";
import LoaderPointsComponent from "../../components/LoaderPoints.component";

export default function ViewCategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (id) {
        const res = await categoryService.get_by_id(id);
        setCategory(res.data);
      }
    };
    fetchCategory();
  }, [id]);

  if (!category) return <LoaderPointsComponent />;

  return (
    <div className="pb-10">
      <h2 className="text-xl font-bold text-center mb-6">
        View Category Details
      </h2>
      <CategoryFormComponent initialData={category} isView={true} />
    </div>
  );
}
