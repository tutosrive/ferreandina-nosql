import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import branchService from "../../services/branch.service";
import BranchFormComponent from "../../components/branches/branchForm.component";
import LoaderPointsComponent from "../../components/LoaderPoints.component";

export default function ViewBranchPage() {
  const { id } = useParams();
  const [branch, setBranch] = useState(null);

  useEffect(() => {
    const fetchBranch = async () => {
      if (id) {
        const res = await branchService.get_by_id(id);
        setBranch(res.data);
      }
    };
    fetchBranch();
  }, [id]);

  if (!branch) return <LoaderPointsComponent />;

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-6">
        View Branch Details
      </h2>
      <BranchFormComponent initialData={branch} isView={true} />
    </div>
  );
}
