import type Worker from "../models/Worker.model";
import Service from "./service";

class WorkerService extends Service<Worker> {
  constructor() {
    super("workers");
  }
}

const workerService = new WorkerService();
export default workerService;
