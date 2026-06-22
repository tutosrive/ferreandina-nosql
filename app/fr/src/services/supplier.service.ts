import type Supplier from "../models/Supplier.model";
import Service from "./service";

class SupplierService extends Service<Supplier> {
  constructor() {
    super("suppliers");
  }
}

const supplierService = new SupplierService();
export default supplierService;
