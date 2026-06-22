import BranchFormComponent from "../../components/branches/branchForm.component";

export default function CreateBranchPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-6">Create New Branch</h2>
      <BranchFormComponent isEdit={false} />
    </div>
  );
}
