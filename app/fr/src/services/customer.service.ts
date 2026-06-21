import api from "./axios.config";
import type ReturningService from "../models/ReturningService.model";
import type Customer from "../models/Customer.model";

class CustomerService {
  async get_all_customers(): Promise<ReturningService> {
    try {
      const response = await api.get("/customers");
      console.log(response);

      return {
        status: response.status,
        data: response.data.data,
        error: false,
      };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async get_customer_by_id(id: string | number): Promise<ReturningService> {
    try {
      const response = await api.get(`/customers/${id}`);
      console.log(response);

      return {
        status: response.status,
        data: response.data.data[0],
        error: false,
      };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async post_customer(customer: Customer): Promise<ReturningService> {
    try {
      const response = await api.post("/customers", customer);
      return {
        status: response.status,
        data: response.data.data,
        error: false,
      };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async update_customer(
    id: string | number,
    customer: Customer,
  ): Promise<ReturningService> {
    try {
      const response = await api.patch(`/customers/${id}`, customer);
      return { status: response.status, data: response.data, error: false };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async delete_customer(id: string | number): Promise<ReturningService> {
    try {
      const response = await api.delete(`/customers/${id}`);
      return { status: response.status, data: response.data, error: false };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }
}

const customerService = new CustomerService();
export default customerService;
