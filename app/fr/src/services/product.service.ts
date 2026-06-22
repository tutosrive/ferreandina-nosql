import type Product from "../models/Product.model";
import Service from "./service";

class ProductService extends Service<Product> {
  constructor() {
    super("products");
  }
}

const productService = new ProductService();
export default productService;
