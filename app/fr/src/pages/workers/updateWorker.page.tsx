import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import workerService from "../../services/worker.service";
import WorkerFormComponent from "../../components/workers/workerForm.component";
import LoaderPointsComponent from "../../components/LoaderPoints.component";

export default function UpdateWorkerPage() {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    const fetchWorker = async () => {
      if (id) {
        const res = await workerService.get_by_id(id);
        setWorker(res.data);
      }
    };
    fetchWorker();
  }, [id]);

  if (!worker) return <LoaderPointsComponent />;

  return (
    <div className="pb-10">
      <h2 className="text-xl font-bold text-center mb-6">
        Update Worker Details
      </h2>
      <WorkerFormComponent initialData={worker} isEdit={true} />
    </div>
  );
}
