import type Product from "./Product.model";
import type Supplier from "./Supplier.model";

export default interface Supplie {
  _id?: number;
  supplier?: Supplier;
  products?: Product[];
  defective_quantity?: number;
  entry_date?: string;
}
