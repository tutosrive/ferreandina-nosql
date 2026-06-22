import type PriceChange from "../models/PriceChange.model";
import Service from "./service";

class ProductService extends Service<PriceChange> {
  constructor() {
    super("price_changes");
  }
}

const productService = new ProductService();
export default productService;
