import type Change from "./Change.model";

export default interface PriceChange {
  _id?: number;
  product_id?: number;
  changes?: Change[];
}
