import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../../services/product.service";
import ProductFormComponent from "../../components/products/productForm.component";
import LoaderPointsComponent from "../../components/LoaderPoints.component";

export default function ViewProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const res = await productService.get_product_by_id(id);
        setProduct(res.data);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <LoaderPointsComponent />;

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-6">
        View Product Details
      </h2>
      <ProductFormComponent initialData={product} isView={true} />
    </div>
  );
}
