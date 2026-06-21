export default interface Product {
  _id?: number;
  name?: string;
  description?: string;
  price?: number;
  category_id?: number;
  quantity?: number;
  unitary_weight?: number;
  sould_out_date?: string;
  supplier?: { id: number; name: string };
}
