import AssignTeacher from "@/components/features/subject/assign-teacher";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function CreateSubjectPage() {
  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* LEFT FORM */}
      <div className="space-y-4">
        <Field>
          <FieldLabel>Subject Name</FieldLabel>
          <Input placeholder="Subject Name" />
        </Field>
      </div>

      {/* RIGHT */}
      <AssignTeacher />
    </div>
  );
}
