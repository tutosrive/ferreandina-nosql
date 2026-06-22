import ProductFormComponent from "../../components/products/productForm.component";

export default function CreateProductPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-6">Create New Product</h2>
      <ProductFormComponent isEdit={false} />
    </div>
  );
}
