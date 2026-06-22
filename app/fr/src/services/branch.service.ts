import type Branch from "../models/Branch.model";
import Service from "./service";

class BranchService extends Service<Branch> {
  constructor() {
    super("branches");
  }
}

const branchService = new BranchService();
export default branchService;
