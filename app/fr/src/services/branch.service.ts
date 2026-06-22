import api from "./axios.config";
import type ReturningService from "../models/ReturningService.model";
import type Branch from "../models/Branch.model";

class BranchService {
  async get_all_branches(): Promise<ReturningService> {
    try {
      const response = await api.get("/branches");
      return {
        status: response.status,
        data: response.data.data,
        error: false,
      };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async get_branch_by_id(id: string | number): Promise<ReturningService> {
    try {
      const response = await api.get(`/branches/${id}`);
      return {
        status: response.status,
        data: response.data.data[0] || response.data.data,
        error: false,
      };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async post_branch(branch: Branch): Promise<ReturningService> {
    try {
      const response = await api.post("/branches", branch);
      return {
        status: response.status,
        data: response.data.data,
        error: false,
      };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async update_branch(
    id: string | number,
    branch: Branch,
  ): Promise<ReturningService> {
    try {
      const response = await api.patch(`/branches/${id}`, branch);
      return { status: response.status, data: response.data, error: false };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }

  async delete_branch(id: string | number): Promise<ReturningService> {
    try {
      const response = await api.delete(`/branches/${id}`);
      return { status: response.status, data: response.data, error: false };
    } catch (error: any) {
      return { status: error.response?.status || 500, data: null, error: true };
    }
  }
}

const branchService = new BranchService();
export default branchService;
