import api from "./axios.config";
import type ReturningService from "../models/ReturningService.model";
import type Product from "../models/Product.model";

class ProductService {
  async get_all_products(): Promise<ReturningService> {
    try {
      const response = await api.get("/products");
      return {
        status: response.status,
        data: response.data.data,
        error: false,
      };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async get_product_by_id(id: string | number): Promise<ReturningService> {
    try {
      const response = await api.get(`/products/${id}`);
      // const data = Array.isArray(response.data.data)
      //   ? response.data.data[0]
      //   : response.data.data;
      const data = response.data.data[0];
      console.log(response);
      console.log(data);

      return { status: response.status, data: data, error: false };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async post_product(product: Product): Promise<ReturningService> {
    try {
      const response = await api.post("/products", product);
      return {
        status: response.status,
        data: response.data.data,
        error: false,
      };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async update_product(
    id: string | number,
    product: Product,
  ): Promise<ReturningService> {
    try {
      const response = await api.patch(`/products/${id}`, product);
      return { status: response.status, data: response.data, error: false };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async delete_product(id: string | number): Promise<ReturningService> {
    try {
      const response = await api.delete(`/products/${id}`);
      return { status: response.status, data: response.data, error: false };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }
}

const productService = new ProductService();
export default productService;
