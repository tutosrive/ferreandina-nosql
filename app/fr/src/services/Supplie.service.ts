import type Supplie from "../models/Supplie.model";
import Service from "./service";

class SupplieService extends Service<Supplie> {
  constructor() {
    super("supplies");
  }
}

const supplieService = new SupplieService();
export default supplieService;
