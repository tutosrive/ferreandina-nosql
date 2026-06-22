import type Customer from "../models/Customer.model";
import Service from "./service";

class CustomerService extends Service<Customer> {
  constructor() {
    super("customers");
  }
}

const customerService = new CustomerService();
export default customerService;
