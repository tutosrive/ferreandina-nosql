import type Change from "./Change.model";

export default interface PriceChange {
  id?: number;
  productid?: number;
  changes?: Change[];
}
