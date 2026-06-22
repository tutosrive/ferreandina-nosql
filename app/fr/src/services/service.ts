import api from "./axios.config";
import type ReturningService from "../models/ReturningService.model";

export default class Service<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get_all(): Promise<ReturningService> {
    try {
      const response = await api.get(`/${this.endpoint}`);
      return {
        status: response.status,
        data: response.data.data,
        error: false,
      };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async get_by_id(id: string | number): Promise<ReturningService> {
    try {
      const response = await api.get(`/${this.endpoint}/${id}`);
      const data = response.data.data[0];

      return { status: response.status, data: data, error: false };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async post(document: T): Promise<ReturningService> {
    try {
      const response = await api.post(`${this.endpoint}`, document);
      return {
        status: response.status,
        data: response.data.data,
        error: false,
      };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async update(id: string | number, document: T): Promise<ReturningService> {
    try {
      const response = await api.patch(`/${this.endpoint}/${id}`, document);
      return { status: response.status, data: response.data, error: false };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async delete(id: string | number): Promise<ReturningService> {
    try {
      const response = await api.delete(`/${this.endpoint}/${id}`);
      return { status: response.status, data: response.data, error: false };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }
}

// const productService = new Service();
// export default productService;
