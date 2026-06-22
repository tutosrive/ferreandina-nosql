import React from "react";
import WorkerFormComponent from "../../components/workers/workerForm.component";

export default function CreateWorkerPage() {
  return (
    <div className="pb-10">
      <h2 className="text-xl font-bold text-center mb-6">Create New Worker</h2>
      <WorkerFormComponent isEdit={false} />
    </div>
  );
}
