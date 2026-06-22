import type Product from "./Product.model";

export default interface Branch {
  id?: number;
  name?: string;
  city?: string;
  direction?: string;
  products?: Product[];
  workers?: Worker[];
  is_main?: boolean;
  image?: string;
}
