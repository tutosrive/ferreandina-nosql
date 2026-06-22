import type Category from "../models/Category.model";
import Service from "./service";

class CategoryService extends Service<Category> {
  constructor() {
    super("categories");
  }
}

const categoryService = new CategoryService();
export default categoryService;
